ng.directive('category', function() {
  return {
    restrict: 'E',
    scope: {options: '=', 'model': '='},
    replace: true,
    template: 	'<select ng-model="model" ng-options="id as name for (id, name) in options">' +
            '<option value=""></option>' +
          '</select>',
  }
});
