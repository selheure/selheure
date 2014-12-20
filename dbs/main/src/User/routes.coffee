angular.module('user').
config( ($stateProvider, $qProvider) ->
  $stateProvider
    .state('userpage', {
      url:         '/user/:name'
      templateUrl: 'partials/User/page.html'
      controller:  'UserPageCtrl'
      resolve: {
        transactions: (Transaction, $stateParams, User)->
          return Transaction.view({
            view: 'validated_by_author'
            key:  User.getId($stateParams.name)
            limit: 10
            descending: true
          })
        announces: (Announce, $stateParams, User)->
          return Announce.view({
            view: 'by_author'
            key:  User.getId($stateParams.name)
            limit: 10
            descending: true
          })
        notValidated: (Transaction, $stateParams, User)->
          return Transaction.view({
            view: 'not_validated'
            key:  User.getId($stateParams.name)
            limit: 10
            descending: true
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
        balance: (Transaction, $stateParams, User)->
          return Transaction.view({
            view: 'balances'
            key: User.getId($stateParams.name)
          })
      }
    })
    .state('userlist', {
      url:         '/utilisateurs/'
      templateUrl: 'partials/User/list.html'
      controller:  'UserListCtrl'
      resolve: {
        users: (User) ->
          return User.view({
            view: 'get'
          })
      }
    })
)
