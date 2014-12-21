angular.module('configuration').
factory('Config', ($http, $location, $q, db)->
  return ->
    defer = $q.defer()
    if db.main.url == ''
      url = $location.absUrl()
      url = url.split('#')[0]
      if url.charAt(url.length-1) != '/'
        url = url.split('/')
        url.pop()
        url = url.join('/')
    else
      url = db.main.url
    applicationName = db.main.name.split('-')[0]
    $http.get("#{url}/config:#{applicationName}", {
      cache: true
    }).then(
      (data)-> #Success
        defer.resolve(data.data)
      ,(err)-> #Error
        defer.resolve(err)
    )
    return defer.promise
)
