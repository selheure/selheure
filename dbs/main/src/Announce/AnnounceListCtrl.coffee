angular.module('announce').
controller 'AnnounceListCtrl', ($scope, $stateParams, $location, $anchorScroll, config, announces) ->
  $scope.selected      = {}
  $scope.announces     = announces
  $scope.announceTypes = config.get('announceTypes')
  $scope.categories    = config.get('categories')

  if $stateParams.id != null
    $scope.selected = $stateParams.id
    $location.hash($scope.selected)
    console.log "scroll"
    $anchorScroll()

