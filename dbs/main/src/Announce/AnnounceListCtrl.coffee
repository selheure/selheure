angular.module('announce').
controller 'AnnounceListCtrl', ($scope, $stateParams, $location, $anchorScroll, config, announces) ->
  $scope.selected      = {}
  $scope.announces     = announces
  $scope.announceTypes = config.get('announceTypes')
  $scope.categories    = config.get('categories')

  if $stateParams.id != null
    $scope.opened = $stateParams.id
    $location.hash($scope.opened)
    $anchorScroll()

