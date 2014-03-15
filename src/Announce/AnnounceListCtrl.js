angular.module('announce').
controller('AnnounceListCtrl', function($scope, config, db, announces, uiLang) {
  $scope.content = {announceTypes: config.announceTypes};
  uiLang.getTranslations('announces').then(function(result){
    angular.extend($scope.content, result);
  });
  $scope.announceTypes = config.announceTypes;
  $scope.announceList = [];
  announces.getLastAnnounces().then(
    function(result) {
      $scope.announceList = result;
      console.log(result);
    },function(error){
      console.log(error);
  });
});
