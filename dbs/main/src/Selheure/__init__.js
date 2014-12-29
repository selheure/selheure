angular.module('selheure', [
  'ui.router',
  'notification',
  'translation',
  'transaction',
  'announce',
  'login',
  'user',
  'dbSelect',
  'configuration'
]).
value('db', {
}).
run(function($rootScope, config, db, DbSelect) {
  DbSelect.setDbConfig('selheure', db, ['private'])
  config.load('selheure', db.main.url)
});
