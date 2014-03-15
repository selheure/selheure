angular.module('announce').
controller('AnnounceEditCtrl', function($scope, $routeParams, $location, url, config, db, login, uiLang, notification) {
  var id = $routeParams['id_announce'];
  $scope.content = {};
  $scope.login = login;
  uiLang.getTranslations('announces').then(function(result){
    angular.extend($scope.content, result);
  });
  $scope.announceTypes = config.announceTypes;
  $scope.announce = {};
  if(id) {
    db.openDoc('announce-'+id).then(function(result) {
      $scope.announce = result;
      console.log($scope.announce);
    });
  }

  $scope.announceSubmit = function() {
    var id;
    if(login.loginRequired()) {
      function onSuccessRedirect(result, edit) {
        notification.success(edit !== undefined ? "Annonce mise à jour" : "L'annonce a bien été créée");
        $location.path(url.announceList.substr(1));
      }
      function creationLoop(announce, errbackLoop) {
        console.log(announce);
        var def = db.update('selheure/announce_edit', announce);
        if(errbackLoop){
          return def.then(onSuccessRedirect, errbackLoop);
        }
      }
      if($scope.announce._id){
        db.update('selheure/announce_edit', $scope.announce).then(function(result) {
          onSuccessRedirect(result, true);
        });
      } else {
        db.getView('selheure', 'announce_ids').then(function(result){
          var announce = angular.copy($scope.announce);
          announce.id = result[0].max ? parseInt(result[0].max) + 1 : 1;
          console.log(announce.id);
          creationLoop(announce, function(error){
            console.log(error);
            if(error[0] == '409'){
              annonce.id += 1;
              creationLoop(announce, this);
            } else {
              notification.error('Une erreur est survenue lors de la création/modification de cette annonce (' + error[0] + ', ' + error[1] + ')');
            }
          });
        });
      }
    }
  }
});
