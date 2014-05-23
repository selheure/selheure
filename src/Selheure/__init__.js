angular.module('selheure', [
  'ui.router',
  'notification',
  'translation',
  'transaction',
  'announce',
  'login',
  'user',
]).
value('db', {
  url:  '',
  name: 'selheure',
});
