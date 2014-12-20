angular.module('transaction').
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

      for t in scope.transactions
        if t.declaredBy != t.editableBy
          if t.editableBy == t.from
            t.fromUser = t.declaredBy
          else if t.editableBy == t.to
            t.toUser = t.declaredBy

        else if t.validated and t.validatedBy != t.validatableBy
          if t.validatableBy == t.from
            t.fromUser = t.validatedBy
          else if t.validatableBy == t.to
            t.toUser = t.validatedBy

      scope.edit = (transaction)->
        $state.go('transactionedit', transaction)

      scope.canValidate = (transaction)->
        if not transaction?
          return false
        return login.isAuthorized(transaction.validatableBy) and !scope.canEdit(transaction)

      scope.canEdit = (transaction)->
        if not transaction?
          return false
        return login.isAuthorized(transaction.editableBy)

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
