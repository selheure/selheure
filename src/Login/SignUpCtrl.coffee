angular.module('login').
controller('SignUpCtrl', ($scope, notification, $modalInstance, login, User) ->
  $scope.user=
    name:          ""
    password:      ""
    passwordconf:  ""

  # On click on SignUp
  $scope.signUpSubmit = ->
    user = $scope.user

    # If password and it's confirmation don't match
    if user.password != user.passwordconf
      notification.setAlert('Les deux mots de passe sont différents !', 'danger')
      return false

    # If one field is not fill
    if user.name is '' or user.password is '' or user.passwordconf is ''
      notification.setAlert('Merci de remplir tous les champs obligatoires')
      return false

    # SignUp
    login.signUp(user).then(
      (data) => #Success
        $modalInstance.close(data)
      ,(err) => #Error
        notification.setAlert("Ce nom d'utilisateur est déjà pris", 'danger')
    )

  $scope.cancel = ->
    $modalInstance.dismiss('cancel')

)
