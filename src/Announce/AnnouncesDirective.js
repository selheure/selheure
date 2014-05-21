angular.module('announce').
directive('announces', function(Config) {
  return {
    restrict: 'E',
    scope: {
      announces:   '=',
      types:       '=',
      category:    '=',
      subcategory: '=',
    },
    replace: true,
    templateUrl: 'partials/Announces/table.html',
    link: function(scope, element, attrs) {
      console.log
      Config().then(
        function(data) {
          scope.config = data;
        }, function(err) {
          console.log(err);
        }
      );
    }
  }
});
