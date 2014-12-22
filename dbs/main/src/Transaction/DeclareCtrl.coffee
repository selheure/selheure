angular.module('transaction').
controller('DeclareCtrl', ($scope, $state, config, login, userList, Announce, Transaction, User, notification)->
  $scope.transaction  = {}
  $scope.userList     = []
  demandList          = []
  proposalList        = []
  $scope.announceList = []

  ########### Edit
  if $state.$current.locals.globals.transaction
    transaction         = $state.$current.locals.globals.transaction
    $scope.transaction  = transaction

    transaction.reason = {
      text:     transaction.message
      announce: transaction.reference
    }
    delete transaction.message
    delete transaction.reference

    if transaction.to != login.getName() and login.proxys.indexOf(transaction.to) == -1
      transaction.toField = transaction.to
      transaction.to      = 'another'

    if transaction.from != login.getName() and login.proxys.indexOf(transaction.from) == -1
      transaction.fromField = transaction.from
      transaction.from      = 'another'


  $scope.newTransactionSubmit = ->
    transaction = angular.copy($scope.transaction)

    if transaction.from == 'another'
      transaction.from = transaction.fromField
      if login.proxys.length == 0
        transaction.to = login.getName()
    if transaction.to == 'another'
      transaction.to = transaction.toField

    delete transaction.toField
    delete transaction.fromField

    console.log transaction
    if not transaction.amount? or
    not transaction.from      or
    not transaction.to
      notification.addAlert('Veuillez remplir les champs obligatoires', 'danger')
      return false

    transaction.update = 'create'

    transaction.to   = User.getId(transaction.to)
    transaction.from = User.getId(transaction.from)

    Transaction.update(transaction).then(
      (data)-> #Success
        $state.go('home')
      ,(err)-> #Error
        console.log err
    )

  $scope.$watch('transaction.from', (value)->
    if value != login.getName()
      $scope.transaction.to = ''
  )

  $scope.$watchCollection('[transaction.fromField, transaction.from]', (value)->
    if value[1] == 'another'
      search = value[0]
    else
      search = value[1]

    if not search?
      search = ""

    Announce.view({
      view: 'demand_all'
      key:  search
    }).then(
      (data)-> #Success
        demandList          = data
        $scope.announceList = proposalList.concat(data)
      ,(err)-> #Error
        console.log err
    )
  )

  $scope.$watchCollection('[transaction.toField, transaction.to]', (value)->
    if value[1] == 'another'
      search = value[0]
    else
      search = value[1]

    if not search?
      search = ""

    Announce.view({
      view: 'proposal_all'
      key:   search
    }).then(
      (data) -> #Success
        proposalList        = data
        $scope.announceList = demandList.concat(data)
      ,(err) -> #Error
        console.log err
    )
  )

  updateUserList = ->
    $scope.userList = []
    for username in userList
      if username != login.getName() and
      login.proxys.indexOf(username) == -1
        $scope.userList.push(username)
    $scope.userList.push(config.collectiveUser)

  updateUserList()
  $scope.$on('SessionChanged', updateUserList)
)
