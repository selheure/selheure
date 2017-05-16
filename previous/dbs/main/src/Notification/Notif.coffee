angular.module('notification').
factory('Notif', (CouchDB, db)->
  return CouchDB(db.main.url, db.main.appName, 'notification')
)
