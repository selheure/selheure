class DbWatcher
  _ignoredChanges: {}

  _ignoreThisChange: (id, rev) ->
    if not @_ignoredChanges[id]?
      @_ignoredChanges[id] = {}
    @_ignoredChanges[id][rev] = true

  _ignoreRelatedChange: (data) ->
    if data._id? and data.rev?
      @_ignoreThisChange(data._id, data.rev)

  _mustIgnoreThisChange: (change) ->
    #TODO: what if several changes in same seq (changes is an array)
    id = change.id
    rev = change.changes[0].rev
    if @_ignoredChanges[id] and @_ignoredChanges[id][rev]
      delete @_ignoredChanges[id][rev]
      return true
    return false

module.exports = DbWatcher