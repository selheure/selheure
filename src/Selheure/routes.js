ng.config(function($routeProvider){
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home.html',
      controller:  'HomeCtrl',
    }).
    when('/annonces/liste', {
      templateUrl: 'partials/announces_list.html',
      controller:  'AnnounceListCtrl',
    }).
    when('/annonces/nouvelle', {
      templateUrl: 'partials/announces_edit.html',
    }).
    when('/annonce/:id_announce/modifier', {
      templateUrl: 'partials/announces_edit.html',
      controller:  'AnnounceEditCtrl',
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
    when('/logout', {redirectTo: '/'}).
    otherwise({redirectTo: '/'});
});
