﻿angular.module('transaction').
directive('transactions', (Config, login, $state, Transaction, notification)->
  return {
    restrict: 'E'
    scope: {
      transactions: '='
    }
    templateUrl: 'partials/Transactions/table.html'
    link: (scope, element, attrs)->
      scope.login = login
      Config().then(
        (data)-> #Success
          scope.config = data
        ,(err)-> #Error
          console.log err
      )

      scope.edit = (transaction)->
        $state.go('transactionedit', transaction)

      scope.validate = (transaction)->
        Transaction.update({
          update: 'validate'
          id:     transaction.id
        }).then(
          (data)-> #Success
            notification.addAlert('Votre validation a été prise en compte', 'success')
            transaction.validated = true
          ,(err)-> #Error
            notification.addAlert('La validation a échoué !', 'danger')
            console.log err
        )
  }
)
