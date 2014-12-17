angular.module('selheure', [
  'ui.router',
  'notification',
  'translation',
  'transaction',
  'announce',
  'login',
  'user',
  'dbSelect',
]).
value('db', {
}).
run(function($rootScope, Config, db, DbSelect) {
  DbSelect.setDbConfig(db, ['private'])
  console.log("dbs", db)
  Config().then(function(config) {
    $rootScope.config = config;
  });
});
