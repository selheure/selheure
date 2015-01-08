angular.module('selheure')
.config(["$provide", ($provide) ->
  $provide.decorator("$exceptionHandler", ["$delegate", ($delegate) ->
    return (exception, cause) ->
      #$delegate(exception, cause)
      console.log exception.message
  ])
])