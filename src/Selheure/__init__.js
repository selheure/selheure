angular.module('selheure', [
  'ngRoute',
  'url',
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
