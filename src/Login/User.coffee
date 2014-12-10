angular.module('login').
factory('User', (CouchDB, db)->
  return CouchDB(db.private, db.name, 'user')
)
