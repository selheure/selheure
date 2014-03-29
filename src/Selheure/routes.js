angular.module('selheure').
config(function($routeProvider){
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home.html',
      name:        'home',
    }).
    when('/utilisateurs/:user_name', {
      templateUrl: 'partials/user_page.html',
      controller:  'UserPageCtrl',
    }).
    when('/echanges/nouvelle', {
      templateUrl: 'partials/transactions_new.html',
      controller:  'NewTransactionCtrl',
    }).
    when('/travail_collectif', {
      templateUrl: 'partials/collective_work.html',
      controller:  'CollectiveWorkCtrl',
    }).
    otherwise({redirectTo: '/'});
});
