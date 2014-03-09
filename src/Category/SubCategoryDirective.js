directive('subCategory', function() {
  return {
    restrict: 'E',
    scope: {
      options:  '=',
      'model':  '=',
      parent:   '=',
    },
    replace: true,
    template: '<select ng-model="model" ng-options="id as name for (id, name) in options[parent]">' +
                '<option value=""></option>' +
              '</select>',
    link: function(scope, elm, attrs) {
      scope.$watch('parent', function(newVal, oldVal) {
        if(newVal !== undefined) {
          if(scope.model !== undefined && scope.model.indexOf(newVal + '-') != 0) {
            console.log(newVal, scope.model, scope.model.indexOf(newVal + '-'));
            scope.model = null;
          }
        }
      });
    }
  }
});
