angular.module('selheure').
config(function($stateProvider, $urlRouterProvider){
  $stateProvider.
    state('home', {
      url:         '/',
      templateUrl: 'partials/home.html',
      controller:  'HomeCtrl',
      resolve: {
        transactions: function(Transaction, Announce) {
          var promise = Transaction.all({
            limit: 10,
          });
          promise.then(function(list) {
            console.log(list);
            for(var i = 0 ; i < list.length ; i++) {
              console.log(list[i]);
              if(list[i].hasOwnProperty('reference') && list[i].reference) {
                console.log(list[i].reference);
                (function(element){
                  Announce.get({
                    view: 'all',
                    key:  element.reference,
                  }).then(function(announce) {
                    element.message = announce.message
                  });
                })(list[i])
              }
            }
          });
          return promise
        },
        announces: function(Announce) {
          return Announce.all({
            limit: 10,
          });
        },
      }
    });

    $urlRouterProvider.otherwise('/');
});
