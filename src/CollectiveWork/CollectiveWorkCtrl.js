angular.module('collectiveWork').
controller('CollectiveWorkCtrl', function($scope, config, db, login, notification) {
  $scope.login = login;
  $scope.transaction = {
    from: config.collectifName,
    //to: login.user.id,
  };

  $scope.newTransactionSubmit = function() {
    if(login.loginRequired()) {
      db.update('selheure/transaction_edit', $scope.transaction).then(function(result) {
        notification.success("Déclaration sauvegardée avec succès !");
        $scope.transaction = {};
      },function(error) {
        console.log(error);
      });
    }
  }
});
