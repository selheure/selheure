angular.module('selheure').
controller('HomeCtrl', (announces, transactions, $scope)->
  $scope.announces    = announces
  $scope.transactions = transactions
)
