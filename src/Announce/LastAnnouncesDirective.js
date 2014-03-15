angular.module('announce').
directive('lastAnnounces', function(announces, config, login) {
  return {
    restrict: 'EA',
    scope: {
      number: '@'
    },
    replace: true,
    templateUrl: 'partials/announce_table.html',
    controller: function($scope) {
      $scope.login = login;
      $scope.announceTypes = config.announceTypes;
      $scope.announceList = [];
      announces.getLastAnnounces($scope.number).then(
        function(result){
          $scope.announceList = result;
        },function(error) {
      })
    }
  }
});
