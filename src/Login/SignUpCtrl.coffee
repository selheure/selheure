angular.module('login').
controller('SignUpCtrl', ($scope, notification, $modalInstance, login, User) ->
  $scope.user=
    name:        ""
    password:      ""
    passwordconf:  ""

  # On click on SignUp
  $scope.signUpSubmit = ->
    user = $scope.user
    console.log 'try'

    # If password and it's confirmation don't match
    if user.password != user.passwordconf
      notification.setAlert('The two password are not the same!', 'danger')
      return false

    # If one field is not fill
    if user.name is '' or user.password is '' or user.passwordconf is ''
      notification.setAlert('Please fill all the fields!')
      return false

    # SignUp
    user['update'] = 'create'
    User.update(user).then(
      (data)-> #Success
        login.signUp(user).then(
          (data) -> #Sucess
            $modalInstance.close(data)
          ,(err) -> #Error
            notification.setAlert('This username is already taken!', 'danger')
        )
      ,(err)-> #Error
        notification.setAlert('This username is already taken!', 'danger')
    )

  $scope.cancel = ->
    $modalInstance.dismiss('cancel')

)
