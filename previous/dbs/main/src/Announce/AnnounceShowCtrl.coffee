angular.module('announce').
controller 'AnnounceShowCtrl', ($scope, $modalInstance, config, announce) ->
  $scope.announce   = announce
  $scope.categories = config.get 'categories'

  $scope.cancel = ->
    $modalInstance.dismiss('cancel')
