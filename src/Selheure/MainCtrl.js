angular.module('selheure').
controller('MainCtrl', function($scope, $rootScope, notification, login, $modal){
  $scope.user = {
    name: '',
    pass: '',
  }
  login.getInfo();

  $rootScope.$on('ChangeLanguage', window.navigator.language)
  $rootScope.$on('$translateChangeError', function(){
    notification.addAlert("You're favorite language is not available!");
    $rootScope.$on('ChangeLanguage', 'en')
  });

  $scope.signIn = function(){
    login.signIn(user.name, user.pass);
  }

  $scope.signUp = function(){
    $modal.open({
      templateUrl: 'partials/signup.html',
    });
  }

  $scope.signOut = function(){
    login.signOut();
  }

});
