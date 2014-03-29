angular.module('selheure').
factory('Selheure', function(CouchDB, db){
  return CouchDB(db.url, db.name, 'selheure')
});
