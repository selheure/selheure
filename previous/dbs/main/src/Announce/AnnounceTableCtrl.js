angular.module('announce').
controller('AnnounceTableCtrl', function($scope, config) {
  $scope.announceTypes = config.get('announceTypes');
  $scope.categories    = config.get('categories');
});
