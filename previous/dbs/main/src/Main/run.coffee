angular.module('selheure').
run ($rootScope, $state, $injector, config, db, DbSelect) ->
  DbSelect.setDbConfig('selheure', db, ['private'])
  config.load('selheure', db.main.url)

  # because login loads User that needs db.private to be defined
  login = $injector.get("login")

  $rootScope.$on(
    '$stateChangeError'
    (event, toState, toParams, fromState, fromParams, error) =>
      $state.go fromState, fromParams
      switch error.status
        when 401
          throw new Error 'unauthorized'
        when 403
          throw new Error 'unauthorized'
        when 0
          throw new Error 'connectionLost'
  )

  $rootScope.$on(
    '$stateChangeStart'
    (event, toState, toParams, fromState, fromParams) =>
      if (toState.loginRequired or toState.roleRequired) and
         !login.isConnected()
        event.preventDefault();
        throw new Error 'loginRequired'

      ###
      if toState.roleRequired? and !login.hasRole(toState.roleRequired)
      ###
  )