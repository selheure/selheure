angular.module('transaction').
controller('CollectiveWorkCtrl', ($scope, config, announces, notification, Transaction, login, $state)->
  $scope.announces   = announces
  $scope.transaction = {}

  $scope.newTransactionSubmit = ()->
    transaction = $scope.transaction
    if not transaction.execution_date? ||
    not transaction.amount?
      notification.addAlert('Veuillez remplir tous les champs obligatoire', 'danger')
      return false
    transaction.update = 'create'
    transaction.to     = 'CRIC'
    transaction.from   = login.getName()
    Transaction.update(transaction).then(
      (data)-> #Success
        notification.addAlert("Déclaration sauvegardée avec succès !", 'success')
        $state.go('home')
      ,(err)-> #Error
        console.log(err)
    )
)
