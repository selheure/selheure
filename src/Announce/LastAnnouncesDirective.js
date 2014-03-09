ng.directive('lastAnnounces', function(announces, config, login) {
  return {
    restrict: 'EA',
    scope: {number: '@'},
    replace: true,
    templateUrl: 'partials/announce_table.html',
    controller: function($scope) {
      $scope.login = login;
      //$scope.content = "Loading...";
      $scope.announceTypes = config.announceTypes;
      $scope.announceList = [];
      announces.getLastAnnounces($scope.number).then(function(result){
        $scope.announceList = result;
        //$scope.content = ;
      }, function(error) {
        //$scope.content = "Error while trying to get the last announces";
      })
    }
  }
});
