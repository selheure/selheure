ng.factory('transactions', function(db) {
  return {
    getLastTransactions: function(nb) {
      return db.getView('selheure', 'transaction_list', [], false, {
        limit: 10,
        descending: true
      }).then(function(list) {
        var result = [];
        angular.forEach(list, function(value, key) {
          console.log('get', value);
          result.push(db.openDoc(value));
        });
        return result;
      });
    },
    getUserLastTransactions: function(nb, username, status) {
      var view = 'user_transaction_list';
      if(status == 'validated')
        view = 'user_validated_transaction_list';
      else if(status == 'not validated')
        view = 'user_non_validated_transaction_list';
      return db.getView('selheure', view, [], false, {
        limit: 10,
        descending: true,
        startkey: [username, {}],
        endkey: [username]
      }).then(function(list) {
        var result = [];
        angular.forEach(list, function(value, key) {
          console.log('get', value);
          result.push(db.openDoc(value));
        });
        return result;
      });
    }
  }
});
