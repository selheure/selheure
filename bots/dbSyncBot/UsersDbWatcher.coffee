DbWatcher = require('./DbWatcher')

class UsersDbWatcher extends DbWatcher
  constructor: (dbServer, @_appDbName, appName, user, password) ->
    @_db = dbServer('_users', user, password)
    @_appName = appName + '-users'

  watch: (privateDb) ->
    @_db.changes().on('change', (change) =>
      console.log "change:", change
      if not @_mustIgnoreThisChange(change)
        name = @_getUsername(change.id)
        if name != ''
          console.log "name #{name}"
          if @_isUserDeletion(change)
            privateDb.removeUser(name)
          else
            @_getUser(change.id).then(
              (user) =>
                if @_hasDataForThisApp(user)
                  console.log "user (_users)", user.name
                  privateDb.updateUserData(name, user.data[@_appDbName])
            )
    )

  _getUser: (userId) ->
    @_db.get(userId)

  _userIdFromUsername: (name) ->
    'org.couchdb.user:' + @_appDbName + '.' + name

  _getUsername: (_id) ->
    startChar = 'org.couchdb.user:'.length
    endAppNameChar = startChar + @_appDbName.length
    if _id[startChar..endAppNameChar-1] == @_appDbName
      return _id[endAppNameChar+1..]
    return ''

  _hasDataForThisApp: (user) ->
    return user.hasOwnProperty('data') and user.data.hasOwnProperty(@_appDbName)

  _isUserDeletion: (change) ->
    #TODO
    return false


  lockUser: (name) ->
    userId = @_userIdFromUsername(name)
    #console.log "lockUser", userId
    @_db.update(@_appName + '/user_lock', userId, {app: @_appDbName})
    .then(
      (data) =>
        @_ignoreRelatedChange(data)
      ,(err) ->
        console.log(err)
    )

  unlockUser: (name) ->
    userId = @_userIdFromUsername(name)
    console.log "unlockUser", userId
    @_db.update(@_appName + '/user_unlock', userId, {app: @_appDbName})
    .then(
      (data) =>
        @_ignoreRelatedChange(data)
      ,(err) ->
        console.log(err)
    )

  resetPassword: (name) ->
    userId = @_userIdFromUsername(name)
    @_db.update(@_appDbName + "/reset_password", userId, {pwd: "toto"})
    .then(
      (data) =>
        @_ignoreRelatedChange(data)
      ,(err) ->
        console.log(err)
    )

module.exports = UsersDbWatcher