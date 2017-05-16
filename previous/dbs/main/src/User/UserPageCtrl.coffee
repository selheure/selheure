angular.module('user').
controller('UserPageCtrl', ($scope, config, login, notification, transactions, announces, balance, notValidated, user)->
  $scope.user         = user
  $scope.transactions = transactions
  $scope.notValidated = notValidated
  $scope.announces    = announces
  $scope.userBalance  = balance[0]?.sum ? 0
  $scope.currencyName = config.get('currency')

  $scope.newUserData =
    tel:          $scope.user.tel
    email:        $scope.user.email
    localization: $scope.user.localization

  $scope.editDataSubmit = (newData) ->
    if not login.isConnected()
      notification.addAlert("Vous devez être connecté(e) pour pouvoir modifier vos données personnelles")
      return
    if user.name != login.getName()
      notification.addAlert("Vous ne pouvez modifier que vos propres données personnelles")
      return
    login.updateUserData(user.name, newData).then(
      (result)=> #Success
        console.log result
        for element,value of newData
          if value?
            $scope.user[element] = value
        $scope.editMode = false
      ,(err)-> #Error
        console.error err
    )

  $scope.changePwdSubmit = (pwd) ->
    if not login.isConnected()
      notification.addAlert("Vous devez être connecté(e) pour pouvoir changer votre mot de passe")
      return false
    if user.name != login.getName()
      notification.addAlert("Vous ne pouvez modifier que votre propre mot de passe")
      return false
    if pwd.new != pwd.confirm
      notification.setAlert('Le mot de passe et la confirmation doivent être identiques', 'danger')
      return false
    if pwd.old is '' or pwd.new is '' or pwd.confirm is ''
      notification.setAlert('Merci de remplir tous les champs obligatoires')
      return false

    login.changePwd(user.name, pwd.old, pwd.new).then(
      (result) =>
        console.log result
        $scope.changePwdMode = false
        notification.setAlert("Mot de passe modifié", "success")
      (err) =>
        if err == 'CHPWD_BADOLDPWD'
          notification.setAlert("Mot de passe actuel incorrect")
        else
          notification.setAlert("Erreur inconnue (log: #{err})")
    )
)
