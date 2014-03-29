angular.module('transaction').
directive('lastTransactions', function(transactions, db, notification, login, PopupService) {
  return {
    restrict: 'E',
    scope: {
      number: '@',
      user:   '=',
      status: '@',
    },
    replace: true,
    templateUrl: 'partials/transaction/table.html',
    link: function(scope, element, attrs) {
      scope.validateTransaction = function(transaction) {
        if(login.loginRequired()) {
          PopupService.close();
          db.update('selheure/validate', {_id: transaction._id}).
          then(function(result) {
            transaction.validated = true;
            notification.success("Echange validé avec succès !");
          }, function(error) {
            console.error(error);
            if(error[0] == 403)
              login.unAuthorizedNotification();
            else if(error[0] == 401)
              login.loginRequiredNotification();
          });
        } else {
          PopupService.close();
          PopupService.alert('Vous n\'êtes pas connecté(e)', 'Vous devez vous connecter pour effectuer cette action', 'Ok', 'close()');
        }
      }
      scope.login = login;
      scope.content = {validatedLabels: {undefined: 'non validé', true: 'validé'}}
      //scope.transactionList = {};
      if(attrs.hasOwnProperty('user')) {
        scope.$watch('user', function(newValue) {
          if(newValue !== undefined) {
            transactions.getUserLastTransactions(scope.number, scope.user.id, scope.status).
            then(function(result) {
              scope.transactionList = result;
            });
          }
        })
      } else {
        transactions.getLastTransactions(scope.number).then(function(result) {
          scope.transactionList = result;
        })
      }
    },
  }
});
