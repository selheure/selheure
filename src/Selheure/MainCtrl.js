angular.module('selheure').
controller('MainCtrl', function($scope, $rootScope, notification){

  $rootScope.$on('ChangeLanguage', window.navigator.language)
  $rootScope.$on('$translateChangeError', function(){
    notification.addAlert("You're favorite language is not available!");
    $rootScope.$on('ChangeLanguage', 'en')
  });

  $scope.signIn = function(){
  }

  $scope.signOut = function(){
  }

});
