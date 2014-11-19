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
          list = Announce.all({
            limit: 10,
          });
          for(element in list) {
            if(element.hasOwnAttribute('reference')) {
              Transaction.get(element.reference).then(function(announce) {
                element.announceTitle = announce.title
              });
            }
          }
          return list
        },
      }
    })

    $urlRouterProvider.otherwise('/');
});
