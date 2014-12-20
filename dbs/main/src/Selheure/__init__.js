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
value('config', {}).
run(function($rootScope, Config, config, db, DbSelect) {
  DbSelect.setDbConfig('selheure', db, ['private'])
  console.log("dbs", db)
  Config().then(function(conf) {
    for(var key in conf){
      config[key] = conf[key]
    }
    $rootScope.config = conf;
  });
});
