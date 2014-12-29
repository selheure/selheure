angular.module('configuration').
controller 'ConfigEditCtrl', ($scope, config, login)->
  newTypeBaseId    = 'zzznew'
  $scope.removedFlag = "REMOVED"

  $scope.newConfig = {}
  for item in ['collectiveUser', 'announceTypes', 'categories', 'currency']
    $scope.newConfig[item] = angular.copy(config.get(item))

  console.log config

  $scope.addAnnounceType = ()->
    num = 0
    while $scope.newConfig.announceTypes.hasOwnProperty(newTypeBaseId + num)
      num++
    $scope.newConfig.announceTypes[newTypeBaseId + num] = ""

  $scope.removeType = (key)->
    delete $scope.newConfig.announceTypes[key]

  nextId = (strNum)->
    console.log strNum
    num = parseInt(strNum)
    if num < 0
      num = 0
    strNum = '' + (num + 1)
    if strNum.length < 2
      strNum = "0" + strNum
    return strNum

  $scope.switchOpenedCategory = (key)->
    if $scope.openedCategory == key
      $scope.openedCategory = ""
    else
      $scope.openedCategory = key

  $scope.addCategory = ()->
    newId = nextId(
      Object.keys($scope.newConfig.categories).length - 2
    )
    while $scope.newConfig.categories.hasOwnProperty(newId)
      newId = nextId(newId)
    $scope.newConfig.categories[newId] = {name: "", sub: {}}


  $scope.removeCategory = (key)->
    $scope.newConfig.categories[key].name = $scope.removedFlag
    for id, sub of $scope.newConfig.categories[key].sub
      $scope.newConfig.categories[key].sub[id] = $scope.removedFlag


  $scope.addSubCategory = (catId)->
    newId = nextId(
      Object.keys($scope.newConfig.categories[catId].sub).length - 2
    )
    while $scope.newConfig.categories[catId].sub.hasOwnProperty(newId)
      newId = nextId(newId)
    $scope.newConfig.categories[catId].sub[newId] = ""


  $scope.removeSubCategory = (key, keySub)->
    $scope.newConfig.categories[key].sub[keySub] = $scope.removedFlag

  $scope.configSubmit = ->
    newConfig = $scope.newConfig

    for id, type of newConfig.announceTypes
      if id.indexOf(newTypeBaseId) == 0
        newConfig.announceTypes[type] = type
        delete newConfig.announceTypes[id]

    config.saveAsNewConfiguration(newConfig)
    console.log newConfig

  $scope.cancel = ->
    $scope.newConfig = angular.copy(config)
