angular.module('announce').
controller('AnnounceEditCtrl', function($scope, $state, Announce, login, notification) {
  var config = $state.$current.locals.globals.config;

  if($state.$current.locals.globals.announce) {
    var announce                = $state.$current.locals.globals.announce;
    if(announce.author != login.getName()) {
      $scope.notAllow = true;
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
    announce = $scope.announce;
    if(
      announce.announce_type == null ||
      announce.category      == null ||
      announce.subCategory   == null ||
      announce.title         == null ||
      announce.message       == null
    ) {
      notification.addAlert('Veuillez remplir tous les champs obligatoire', 'danger');
      return false;
    }
    announce.update = 'edit';
    Announce.update(announce).then(
      function(data) {
        $state.go('announcelist');
      }, function(err) {
        console.log(err);
      }
    );
  }
});
