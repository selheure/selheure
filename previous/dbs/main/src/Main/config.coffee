angular.module('selheure').
config(["$provide", ($provide) ->
  $provide.decorator("$exceptionHandler", ($delegate, $injector, errors) ->
    return (exception, cause) ->
      # to avoid circular dependency issue
      $state       = $injector.get("$state")
      notification = $injector.get("notification")
      if errors.hasOwnProperty exception.message
        notification.setAlert errors[exception.message], 'danger'
      else
        $delegate(exception, cause)
  )
])