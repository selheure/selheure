angular.module('announce').
controller('AnnounceListCtrl', function($scope, $modal, $state, $stateParams, announces, announce) {
  $scope.selected      = {};
  $scope.announces     = announces;

  if(announce !== null) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/Announces/show.html',
      controller:  'AnnounceShowCtrl',
      resolve: {
        announce: function() {
          return announce;
        },
      }
    });

    modalInstance.result.then(
      function () { },
      function (data) {
        console.log("closed", data);
        $state.go("announcelist");
      }
    );

  }
});
