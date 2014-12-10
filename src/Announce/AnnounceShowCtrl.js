angular.module('announce').
controller('AnnounceShowCtrl', function($scope, $modalInstance, announce) {
  $scope.announce = announce;
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }
});