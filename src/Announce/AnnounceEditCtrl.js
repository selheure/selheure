angular.module('announce').
controller('AnnounceEditCtrl', function($scope, $route, url, Announce) {
  var config = $route.current.locals.config;
  if($route.current.locals.hasOwnProperty('announce')) {
    announce                    = $route.current.locals.announce;
    $scope.announce             = angular.copy(announce);
    $scope.announce.category    = announce.category.split('-')[0];
    $scope.announce.subCategory = announce.category;
  } else {
    $scope.announce = {};
  }
  $scope.selected = {};

  $scope.announceTypes = config.announceTypes;
  $scope.categories    = config.categories;
  $scope.subCategories = config.sub_categories;

  $scope.announceSubmit = function() {
    $scope.announce.update = 'edit'
    Announce.update($scope.announce).then(
      function(data) {
        url.redirect('announce.list');
      }
    );
  }
});
