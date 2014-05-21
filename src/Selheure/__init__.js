angular.module('selheure', [
  'ui.router',
  'notification',
  'translation',
  'breadcrumb',
  'announce',
  'login',
  'user',
]).
value('db', {
  url:  '',
  name: 'selheure',
});
