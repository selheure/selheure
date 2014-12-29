angular.module('user').
config ($stateProvider) ->
  $stateProvider
    .state('configedit', {
      url:         '/configuration'
      templateUrl: 'partials/Config/edit.html'
      controller:  'ConfigEditCtrl'
    })