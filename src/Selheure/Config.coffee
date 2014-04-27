angular.module('selheure').
factory('Config', ($http, $q, db)->
  return ->
    defer = $q.defer()
    $http.get("/#{db.name}/selheure:config", {
      cache: true
    }).then(
      (data)-> #Success
        defer.resolve(data.data)
      ,(err)-> #Error
        defer.resolve(err)
    )
    return defer.promise
)
