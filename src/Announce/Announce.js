angular.module('announce').
factory('Announce', function(CouchDB, db){
  return CouchDB(db.main.url, db.main.appName, 'announce')
});
