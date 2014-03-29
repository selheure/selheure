angular.module('announce').
directive('lastAnnounces', function(Selheure, Announce, $route) {
  return {
    restrict: 'E',
    scope: {
      number: '@',
    },
    replace: true,
    templateUrl: 'partials/Announces/table.html',
    link: function(scope, element, attrs) {
      config = Selheure.getDoc({
        id: 'config',
      }).then(
        function(config) {
          scope.announceTypes = config.announceTypes;
        }
      );

      Announce.all({
        descending: true,
        limit:      parseInt(scope.number),
      }).then(
        function(data) {
          scope.announceList = data;
        }
      );
    }
  }
});
