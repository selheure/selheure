angular.module('transaction').
factory('Transaction', (CouchDB, db, User)->
  userFields = ['to', 'from', 'declared_by', 'editable', 'validator']

  Transaction = CouchDB(db.main.url, db.main.appName, 'transaction')

  Transaction.all_then = (transactions)->
    for id, transaction of transactions
      for field in userFields
        transaction[field] = User.getName(transaction[field])
    return transactions


  Transaction.get_then = (transaction)->
    for field in userFields
      transaction[field] = User.getName(transaction[field])
    return transaction

  Transaction.view_then = (transactions)->
    for id, transaction of transactions
      for field in userFields
        transaction[field] = User.getName(transaction[field])
    return transactions

  return Transaction
)
