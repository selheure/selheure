angular.module('announce').
controller('AnnounceListCtrl', function($scope, announces) {
  $scope.announces = announces
});
