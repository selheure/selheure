angular.module('announce').
controller('AnnounceEditCtrl', function($scope, $state, Announce, login) {
  var config = $state.$current.locals.globals.config;

  if($state.$current.locals.globals.announce) {
    var announce                = $state.$current.locals.globals.announce;
    if(announce.author != login.getName()) {
      $state.go('announcelist');
    }
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
        $state.go('announcelist');
      }
    );
  }
});
