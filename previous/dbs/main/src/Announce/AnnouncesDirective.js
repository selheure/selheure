angular.module('announce').
directive('announces', function(config) {
  return {
    restrict: 'E',
    scope: {
      announces:   '=',
      types:       '=',
      category:    '=',
      subcategory: '=',
    },
    templateUrl: 'partials/Announces/table.html',
  }
});
