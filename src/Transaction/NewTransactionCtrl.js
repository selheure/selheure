angular.module('transaction').
controller('NewTransactionCtrl', function($scope, $q, $filter, db, login, notification) {
  $scope.transaction = {
  };
  $scope.userAnnounces = [];
  $scope.content = {
    from: "De",
    to: "A",
    amount: "Nombre de minutes",
    date: "Le",
    submit: "Valider",
  };
  $scope.login = login
  db.getView('selheure', 'username_list', [], false).then(function(result) {
    $scope.userList = {};
    $scope.userListArray = result;
    angular.forEach(result, function(value) {
      $scope.userList[value] = value;
    });
    console.log($scope.userList)
  })
  $scope.newTransactionSubmit = function() {
    if(login.loginRequired()) {
      var transaction = angular.copy($scope.transaction);
      var date = $scope.transaction.execution_date.split('/');
      console.log(date);
      // à améliorer
      // datepicker
      transaction.execution_date = new Date(date[2], parseInt(date[1]) - 1, date[0], '01').toISOString();
      console.log(transaction);
      db.update('selheure/transaction_edit', transaction).then(function(result) {
        console.log("success!!", result);
        notification.success("Déclaration sauvegardée avec succès !");
        $scope.transaction = {};
      },function(error) {
        console.log(error);
      });
    }
  }
  var fromUserAnnounces = [], toUserAnnounces = [];
  $scope.$watch("transaction.to", function(newVal, oldVal){
    if(newVal !== undefined && $scope.userList.hasOwnProperty(newVal)) {
      db.getView('selheure', 'proposal_announce_list', ['key', newVal], false).then(function(result) {
        console.log(result);
        toUserAnnounces = result instanceof Array ? result : [];
        $scope.userAnnounces = toUserAnnounces.concat(fromUserAnnounces);
      });
      //getUserAnnounces(newVal)
    }
  });
  $scope.$watch("transaction.fromButton", function(newVal, oldVal){
    if(newVal !== undefined){
      console.log($filter('filter')(login.user.proxyFor, newVal))
      if(newVal == login.user.id ||
          login.user.proxyFor && $filter('filter')(login.user.proxyFor, newVal).length){
        $scope.transaction.toButton = false;
        $scope.transaction.from = $scope.transaction.fromButton;
      }
      else {
        $scope.transaction.from = "";
        $scope.transaction.toButton = login.user.id;
      }
    }
  });
  $scope.$watch("transaction.toButton", function(newVal, oldVal){
    if(newVal !== undefined){
      if(newVal == login.user.id ||
          login.user.proxyFor && $filter('filter')(login.user.proxyFor, newVal).length){
        $scope.transaction.to = $scope.transaction.toButton;
      } else
        $scope.transaction.to = "";
    }
  });
  $scope.$watch("transaction.from", function(newVal, oldVal){
    if(newVal !== undefined && $scope.userList.hasOwnProperty(newVal)) {
      db.getView('selheure', 'demand_announce_list', ['key', newVal], false).then(function(result) {
        console.log(result);
        fromUserAnnounces = result instanceof Array ? result : [];
        console.log(fromUserAnnounces);
        $scope.userAnnounces = fromUserAnnounces.concat(toUserAnnounces);
      });
    }
  });
});
