angular.module('transaction').
config( ($stateProvider)->
  $stateProvider.
    state('declare', {
      url:         '/echanges/nouvelle'
      templateUrl: 'partials/Transactions/declare.html'
      controller:  'DeclareCtrl'
      resolve: {
        userList: (User) ->
          return User.all()
      }
    }).
    state('transactionedit', {
      url:         '/echanges/:id/editer'
      templateUrl: 'partials/Transactions/declare.html'
      controller:  'DeclareCtrl'
      resolve: {
        transaction: (Transaction, $stateParams) ->
          return Transaction.get({
            key:          $stateParams.id
            include_docs: true
          })
        userList: (User) ->
          return User.all()
      }
    }).
    state('work', {
      url:         '/travail_collectif'
      templateUrl: 'partials/Transactions/collectivework.html'
      controller:  'CollectiveWorkCtrl'
      resolve: {
        config: (Config)->
          return Config()
        announces: (Announce)->
          Announce.view({
            view:         'by_author'
            key:          'CRIC'
            include_docs: true
          })
      }
    })
)
