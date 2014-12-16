angular.module('category').
filter('category', ->
  return (announces, category, subCategory)->
    results = []
    if subCategory
      for announce in announces
        if announce.category == subCategory
          results.push(announce)
    else if category
      for announce in announces
        p = announce.category.split('-')[0]
        if p == category
          results.push(announce)
    else
      results = announces

    return results
)
