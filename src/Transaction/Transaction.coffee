angular.module('transaction').
factory('Transaction', (CouchDB, db)->
  return CouchDB(db.main.url, db.main.appName, 'transaction')
)
