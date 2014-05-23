angular.module('user').
config( ($stateProvider) ->
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
        notValidate: (Transaction, $stateParams)->
          return Transaction.view({
            view: 'not_validated'
            key:  $stateParams.name
            limit: 10
          })
        user: (User, $stateParams)->
          return User.get({
            key: $stateParams.name
          })
        balance: (Transaction, $stateParams)->
          return Transaction.view({
            view: 'balances'
            key: $stateParams.name
          })
      }
    })
)
