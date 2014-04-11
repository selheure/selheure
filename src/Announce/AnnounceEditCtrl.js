angular.module('announce').
controller('AnnounceEditCtrl', function($scope, $route, url, Announce) {
  var config = $route.current.locals.config;
  $scope.selected = {}

  $scope.announceTypes = config.announceTypes;
  $scope.categories    = config.categories;
  $scope.subCategories = config.sub_categories;

  $scope.announceSubmit = function() {
    console.log('call');
    Announce.view({
      view: 'ids',
    }).then(function(data){
      if(data.length !== 0) {
        data = data[0];
      } else {
        data = {};
      }

      Announce.update({
        update: 'edit',
        type:   $scope.annouce.type,
        id:     data.max +1 || 1,
      }).then(
        function(data) {
          url.redirect('announce.list');
        }
      );
    });
  }
});
