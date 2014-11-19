angular.module('user').
controller('UserPageCtrl', ($scope, transactions, announces, balance, notValidated, $state, user)->
  $scope.user         = user
  $scope.transactions = transactions
  $scope.notValidated  = notValidated
  $scope.announces    = announces
  $scope.balance      = {
    value: balance[0]?.sum ? 0
    unity: 'minutes'
  }
)
