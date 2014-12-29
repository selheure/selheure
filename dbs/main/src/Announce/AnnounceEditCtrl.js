angular.module('announce').
controller('AnnounceEditCtrl', function($scope, $state, config, Announce, login, notification, announce) {
  $scope.announce = announce || {}
  $scope.announceTypes = config.get('announceTypes');
  $scope.categories    = config.get('categories');

  if(announce.hasOwnProperty('author')) {
    if(announce.author != login.getName()) {
      $scope.notAllowed = true;
    }
  }
  $scope.selected = {};

  $scope.isEmpty = function (obj) {
    for (var i in obj) if (obj.hasOwnProperty(i)) return false;
    return true;
};

  $scope.announceSubmit = function() {
    announce = $scope.announce;
    if(
      announce.announce_type == null ||
      announce.category      == null ||
      announce.title         == null ||
      announce.message       == null
    ) {
      notification.addAlert('Veuillez remplir tous les champs obligatoires', 'danger');
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
