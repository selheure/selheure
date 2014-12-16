DbWatcher = require('./DbWatcher')

class PrivateDbWatcher extends DbWatcher
  constructor: (dbServer, privateDbName, appName, user, password) ->
    @_db      = dbServer(privateDbName, user, password)
    @_appName = appName + '-private'

  watch: (usersDb) =>
    @_db.changes().on('change', (change) =>
      #console.log "change:", change
      if not @_mustIgnoreThisChange(change)
        @_getUser(change.id).then(
          (user) =>
            console.log user.name
            if @_doesPasswordMustBeReset(user)
              console.log "password must be reset"
              usersDb.resetPassword(user.name)
              @_removeResetPasswordFlag(user)
            else if @_isLocked(user)
              console.log "user must be locked"
              usersDb.lockUser(user.name)
            else
              console.log "user must be unlocked"
              usersDb.unlockUser(user.name)
        )
    )

  _getUser: (userId) ->
    if userId[0..4] != 'user:'
      userId = @_userIdFromUsername(userId)
    @_db.get(userId)

  _userIdFromUsername: (name) ->
    'user:' + name

  _doesPasswordMustBeReset: (user) ->
    return user.resetPassword is true

  _isLocked: (user) ->
    return user.locked

  _removeResetPasswordFlag: (user) ->
    @_db.update(@_appName + '/user_removeResetPwdFlag', user._id).then(
      (data) =>
        @_ignoreRelatedChange(data)
      ,(err) ->
        console.log(err)
    )

  removeUser: (username) ->
    #TODO
    if username == ''
      console.log "no username. Can't remove user"
      return false

  createUser: (user) ->
    #TODO

  updateUserData: (username, data) ->
    console.log "updateUserData", username, data
    if username == ''
      console.log "no username. Can't update user data"
      return false
    @_db.update(@_appName + '/user_userData', @_userIdFromUsername(username), {data: data})
    .then(
      (data) =>
        @_ignoreRelatedChange(data)
      ,(err) ->
        console.log(err)
    )

module.exports = PrivateDbWatcher