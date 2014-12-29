angular.module('category').
directive('category', function() {
  return {
    restrict: 'E',
    scope: {
      'options': '=',
      'model':   '=',
    },
    replace: true,
    template: 	'<select ng-model="model" ng-options="id as obj.name for (id, obj) in options">' +
            '<option value=""></option>' +
          '</select>',
  }
});
