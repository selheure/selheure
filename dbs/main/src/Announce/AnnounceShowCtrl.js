angular.module('announce').
controller('AnnounceShowCtrl', function($scope, $modalInstance, config, announce) {
  $scope.announce   = announce;
  $scope.categories = config.get('categories');

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }
});