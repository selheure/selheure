angular.module('selheure').
factory('Config', ($http, $location, $q, db)->
  return ->
    defer = $q.defer()
    if db.url == ''
      url = $location.absUrl()
      url = url.split('#')[0]
      if url.charAt(url.length-1) != '/'
        url = url.split('/')
        url.pop()
        url = url.join('/')
    else
      url = db.url
    $http.get("#{url}/selheure:config", {
      cache: true
    }).then(
      (data)-> #Success
        defer.resolve(data.data)
      ,(err)-> #Error
        defer.resolve(err)
    )
    return defer.promise
)
