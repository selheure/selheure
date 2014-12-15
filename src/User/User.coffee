angular.module('user').
factory('User', (CouchDB, db)->
  return CouchDB(db.private.url, db.private.appName, 'user')
)
