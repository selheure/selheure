angular.module('selheure').
controller 'MainCtrl', ($scope, $rootScope, notification, login, $modal, User) ->
  $rootScope.login = login

  $scope.user =
    name: ''
    pass: ''

  login.getInfo()

  $rootScope.$on('ChangeLanguage', window.navigator.language)
  $rootScope.$on('$translateChangeError', () ->
    notification.addAlert("You're favorite language is not available!")
    $rootScope.$on('ChangeLanguage', 'en')
  )

  $scope.signIn = ->
    login.signIn($scope.user.name, $scope.user.pass).then(
      (data) =>
        $scope.user = {}
        if(!login.isValidated())
          notification.addAlert("Votre compte n'est pas encore validé. Vous ne pourrez pas effectuer certaines actions", 'danger')
      (err) =>
        console.log(err)
        notification.addAlert('Mauvais Utilisateur/Mot de passe', 'danger')

    )

  $scope.signUp = ->
    $modal.open({
      templateUrl: 'partials/signup.html'
      controller:  'SignUpCtrl'
    })

  $scope.signOut = ->
    login.signOut()
