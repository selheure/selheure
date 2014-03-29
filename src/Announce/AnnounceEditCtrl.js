angular.module('announce').
controller('AnnounceEditCtrl', function($scope, config, url) {

  $scope.announceTypes = config.announceTypes;

  $scope.announceSubmit = function() {
    Annouce.get({
      view: 'ids',
    }).then(function(data){
      Announce.update({
        update: 'edit',
        type:   $scope.annouce.type,
        id:     data.max,
      }).then(
        function(data) {
          url.redirect('announce.list');
        }
      );
    });
  }
});
