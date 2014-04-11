angular.module('socket').
factory('socket', ($location) ->
  host = $location.host()
  try
    result = io.connect("//#{host}:8800")
  catch e
    console.log('socket not available')
    result = {
      on: (nothing) ->
        console.log "try listening on #{nothing}"
    }
  return result
)
