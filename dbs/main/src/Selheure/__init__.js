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
  main: {
    url:     '',
    name:    '',
    appName: 'selheure'
  },
  private: {
    url:     '',
    name:    '',
    appName: 'selheure-private'
  }
}).
run(function($rootScope, Config, db, DbSelect) {
  db.main = DbSelect.getMainDb()
  db.main.appName = 'selheure-main'
  db.private = DbSelect.getDb('private')
  db.private.appName = 'selheure-private'
  console.log("dbs", db)
  Config().then(function(config) {
    $rootScope.config = config;
  });
});
