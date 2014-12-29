angular.module('configuration').
factory 'config', ($http, $location, $q)->

  return {
    _confObj: {}

    _buildUrl: ()->
      return "#{@_baseUrl}/config:#{@_appName}"

    _updateConfObject: (newConf) ->
      angular.extend(@_confObj, newConf)

    load: (appName, baseUrl) ->
      @_appName = appName
      @_baseUrl = baseUrl
      return $http.get(@_buildUrl(), {
        cache: true
      }).then(
        (result)=> #Success
          @_updateConfObject(result.data)
          return result.data
      )

    get: (item) ->
      return @_confObj[item]

    saveAsNewConfiguration: (newConf) ->
      for item in ['_id', '_rev', 'type', 'id']
        newConf[item] = @_confObj[item]
      newConf._
      $http.put(@_buildUrl(), newConf).then(
        (result) =>
          @_updateConfObject(newConf)
          @_confObj._rev = result.data.rev
          console.log "new conf", result, newConf
        (err) =>
          console.error(err)
          return err
      )
  }
