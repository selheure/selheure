angular.module('user').
controller('UserPageCtrl', ($scope, transactions, announces, balance, notValidate, $state, user)->
  $scope.user         = user
  $scope.transactions = transactions
  $scope.notValidate  = notValidate
  $scope.announces    = announces
  $scope.balance      = {
    value: balance[0]?.sum ? 0
    unity: 'minutes'
  }
)
