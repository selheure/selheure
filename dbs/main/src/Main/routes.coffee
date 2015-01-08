angular.module('selheure').
config ($stateProvider, $urlRouterProvider) ->
  $stateProvider.
    state('home',
      url:         '/',
      templateUrl: 'partials/home.html',
      controller:  'HomeCtrl',
      onEnter: ($stateParams) ->
        console.log $stateParams
      resolve:
        transactions: (Transaction, Announce) ->
          return Transaction.all({
            limit: 10
            descending: true
          }).then (list) ->
            for i, e of list
              if list[i].hasOwnProperty('reference') and list[i].reference
                ( (element) ->
                  Announce.get({
                    view: 'all'
                    key:  element.reference
                  }).then (announce) ->
                    element.message = announce.message
                )(list[i])
            return list

        announces: (Announce) ->
          return Announce.all({
            limit: 10
            descending: true
          })
    )

  $urlRouterProvider.otherwise('/')
