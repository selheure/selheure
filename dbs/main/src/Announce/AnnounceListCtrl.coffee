angular.module('announce').
controller 'AnnounceListCtrl', ($scope, $stateParams, $location, $anchorScroll, config, login, Announce, announces) ->
  $scope.selected      = {}
  $scope.announces     = announces
  $scope.announceTypes = config.get('announceTypes')
  $scope.categories    = config.get('categories')

  if $stateParams.id != null
    $scope.opened = $stateParams.id
    $location.hash($scope.opened)
    $anchorScroll()

  $scope.canEdit = (announce) ->
    if not announce?
      return false
    login.isAuthorized(announce.author)

  $scope.canDelete = (announce) ->
    $scope.canEdit(announce)


  $scope.delete = (announce) ->
    if not $scope.canDelete announce
      console.error "Not authorized"
      return
    announce.update = 'delete'
    Announce.update(announce).then(
      (data) ->
        idx = $scope.announces.indexOf(announce)
        $scope.announces.splice(idx, 1);
      , (err) ->
        console.log(err)
    )