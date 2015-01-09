angular.module('selheure').
config ($stateProvider, $urlRouterProvider) ->
  $stateProvider.
    state('home',
      url:         '/',
      templateUrl: 'partials/home.html',
      controller:  'HomeCtrl',
      resolve:
        transactions: (Transaction, Announce) ->
          return Transaction.all({
            limit:        10
            descending:   true
            include_docs: true
          }).then (list) ->
            for i, e of list
              if list[i].hasOwnProperty('reference') and list[i].reference
                ( (element) ->
                  Announce.get({
                    view:         'all'
                    key:          element.reference
                    include_docs: true
                  }).then (announce) ->
                    element.message = announce.title
                )(list[i])
            return list

        announces: (Announce) ->
          return Announce.all({
            include_docs: true
            limit:        10
            descending:   true
          })
    )

  $urlRouterProvider.otherwise('/')
