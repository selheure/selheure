angular.module('selheure').
controller('HomeCtrl', (announces, $scope)->
  $scope.announces = announces
)
