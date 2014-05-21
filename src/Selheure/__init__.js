angular.module('selheure', [
  'ui.router',
  'notification',
  'translation',
  'transaction',
  'breadcrumb',
  'announce',
  'login',
  'user',
]).
value('db', {
  url:  '',
  name: 'selheure',
});
