angular.module('selheure').
run ($rootScope, $state, config, db, DbSelect) ->
  DbSelect.setDbConfig('selheure', db, ['private'])
  config.load('selheure', db.main.url)

  $rootScope.$on(
    '$stateChangeError'
    (event, toState, toParams, fromState, fromParams, error) =>
      console.error 'stateChangeError', event, toState, toParams, fromState, fromParams, error
      switch error.status
        when 401
          $state.go 'home'
          throw new Error 'unauthorized'
        when 403
          $state.go 'home'
          throw new Error 'unauthorized'
        when 0
          $state.go 'home'
          throw new Error 'connectionLost'
  )

  $rootScope.$on(
    '$stateChangeStart'
    (event, toState, toParams, fromState, fromParams) =>
      ###
      if (toState.loginRequired or toState.roleRequired) and
         login.isConnected()


      if toState.roleRequired? and !login.hasRole(toState.roleRequired)
      ###

      console.log 'stateChangeStart', event, toState, toParams, fromState, fromParams
  )