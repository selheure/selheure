angular.module('category').
directive('subCategory', function() {
  return {
    restrict: 'E',
    scope: {
      'options': '=',
      'model':  '=',
      'parent': '=',
    },
    replace: true,
    template: '<select ng-model="model" ng-options="id as name for (id, name) in options[parent]">' +
                '<option value=""></option>' +
              '</select>'
  }
});
