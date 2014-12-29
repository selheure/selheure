angular.module('category').
filter('category', ->
  return (announces, category, subCategory)->
    results = []
    if subCategory
      for announce in announces
        if announce.subCategory == subCategory
          results.push(announce)
    else if category
      for announce in announces
        if announce.category == category
          results.push(announce)
    else
      results = announces

    return results
)
