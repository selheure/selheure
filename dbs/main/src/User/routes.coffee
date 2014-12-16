angular.module('user').
config( ($stateProvider, $qProvider) ->
  $stateProvider
    .state('userpage', {
      url:         '/user/:name'
      templateUrl: 'partials/User/page.html'
      controller:  'UserPageCtrl'
      resolve: {
        transactions: (Transaction, $stateParams)->
          return Transaction.view({
            view: 'by_author'
            key:  $stateParams.name
            limit: 10
          })
        announces: (Announce, $stateParams)->
          return Announce.view({
            view: 'by_author'
            key:  $stateParams.name
            limit: 10
          })
        notValidated: (Transaction, $stateParams)->
          return Transaction.view({
            view: 'not_validated'
            key:  $stateParams.name
            limit: 10
          })
        user: (User, $stateParams, $q)->
          deferred = $q.defer()
          User.get({
            key: $stateParams.name
          }).then(
            (result) =>
              deferred.resolve(result)
            (err) =>
              deferred.resolve({name: $stateParams.name})
          )
          return deferred.promise
        balance: (Transaction, $stateParams)->
          return Transaction.view({
            view: 'balances'
            key: $stateParams.name
          })
      }
    })
    .state('userlist', {
      url:         '/utilisateurs/'
      templateUrl: 'partials/User/list.html'
      controller:  'UserListCtrl'
      resolve: {
        users: (User, login) ->
          return User.view({
            view: 'get'
          })
      }
    })
)
