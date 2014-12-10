angular.module('transaction').
factory('Transaction', (CouchDB, db)->
  return CouchDB(db.url, db.appName, 'transaction')
)
