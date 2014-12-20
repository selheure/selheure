angular.module('announce').
filter('types', ->
  return (announces, types)->
    if types?
      results = []
      for announce in announces
        if announce.announce_type == types
          results.push(announce)

      return results
    else
      return announces
)
