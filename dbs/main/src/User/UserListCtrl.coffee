angular.module('user').
controller('UserListCtrl', ($scope, $modal, $state, notification, User, login, users) ->
  $scope.users = users

  $scope.lockUser = (user) ->
    console.log user
    User.update({
      update: 'lock'
      id:     user.name
    }).then(
      (data) ->
        user.locked = true
      ,(err) ->
        notification.addAlert('Le verrouillage a échoué ! (Log : ' + err + ')', 'danger')
        console.log err
    )

  $scope.unlockUser = (user) ->
    console.log user
    User.update({
      update: 'unlock'
      id:     user.name
    }).then(
      (data) ->
        user.locked = false
      ,(err) ->
        notification.addAlert('Le déverrouillage a échoué ! (Log : ' + err + ')', 'danger')
        console.log err
    )

  $scope.resetPwd = (user) ->
    console.log user
    User.update({
      update: 'resetPwd'
      id:     user.name
    }).then(
      (data) ->
        notification.addAlert('Mot de passe réinitialisé à "motdepasse"', 'info')
      ,(err) ->
        notification.addAlert('Le déverrouillage a échoué ! (Log : ' + err + ')', 'danger')
        console.log err
    )
)
