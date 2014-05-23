angular.module('selheure').
config(function($stateProvider, $urlRouterProvider){
  $stateProvider.
    state('home', {
      url:         '/',
      templateUrl: 'partials/home.html',
      controller:  'HomeCtrl',
      resolve: {
        transactions: function(Transaction) {
          return Transaction.all({
            limit: 10,
          });
        },
        announces: function(Announce) {
          return Announce.all({
            limit: 10,
          });
        },
      }
    })

    $urlRouterProvider.otherwise('/');
});
