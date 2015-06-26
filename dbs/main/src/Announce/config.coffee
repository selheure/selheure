angular.module('announce')
.config(["$provide", ($provide) ->
  $provide.decorator("$exceptionHandler", ["$delegate", ($delegate) ->
    return (exception, cause) ->
      #$delegate(exception, cause)
      console.log "announce exception", exception.message
  ])
])
