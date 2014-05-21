angular.module('transaction').
directive('transactions', (Config)->
  return {
    restrict: 'E'
    scope: {
      transactions: '='
    }
    templateUrl: 'partials/Transactions/table.html'
    link: (scope, element, attrs)->
      Config().then(
        (data)-> #Success
          scope.config = data
        ,(err)-> #Error
          console.log err
      )
  }
)
