angular.module('user').
factory('User', (CouchDB, db)->
  User = CouchDB(db.private.url, db.private.appName, 'user')

  User.getName = (name) ->
    if not name
      return ''
    if name.indexOf(db.main.name + '.') == 0
      name = name[db.main.name.length+1..]
    return name

  User.getId = (name) ->
    return db.main.name + '.' + name

  return User
)
