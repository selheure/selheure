angular.module('selheure', [
  'ui.router',
  'dbSelect',
  'notification',
  'translation',
  'breadcrumb',
  'announce',
  'login',
]).
value('db', {
  url:  '',
  name: 'selheure',
});
