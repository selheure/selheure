angular.module('user').
directive('userLink', function(url) {
  return {
    restrict: 'AE',
    scope: {name: '='},
    replace: true,
    template: '<a></a>',
    link: function(scope, elm, attrs) {
      scope.$watch('name', function(newValue) {
        if(newValue !== undefined) {
          elm.attr('href', url.userPage(newValue));
          elm.html(newValue);
        }
      });
    }
  }
});
