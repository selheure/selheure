angular.module('selheure').
controller('MainCtrl', function($scope, $rootScope, notification, login, $modal, User){
  $rootScope.login = login

  $scope.user = {
    name: '',
    pass: '',
  }
  login.getInfo();

  $rootScope.$on('ChangeLanguage', window.navigator.language);
  $rootScope.$on('$translateChangeError', function(){
    notification.addAlert("You're favorite language is not available!");
    $rootScope.$on('ChangeLanguage', 'en');
  });

  $scope.signIn = function(){
    login.signIn($scope.user.name, $scope.user.pass).then(
      function (data){
        $scope.user = {}
        if(!login.isValidated())
          notification.addAlert("Votre compte n'est pas encore validé. Vous ne pourrez pas effectuer certaines actions", 'danger')
      },function (err){
        console.log(err);
        notification.addAlert('Mauvais Utilisateur/Mot de passe', 'danger')
      }
    );
  }

  $scope.signUp = function(){
    $modal.open({
      templateUrl: 'partials/signup.html',
      controller:  'SignUpCtrl',
    });
  }

  $scope.signOut = function(){
    login.signOut();
  }

});
