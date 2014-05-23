exports.transaction_get = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id)
      emit(doc.id, doc);
  }
}

exports.transaction_by_author = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id)
      emit(doc.to.split(' ')[0], doc);
      emit(doc.from.split(' ')[0], doc);
  }
}

exports.transaction_all = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id)
      emit(doc.created_at, doc);
  }
}

exports.transaction_not_validated = {
  map: function(doc) {
    if(doc.type && doc.type == "transaction" && !doc.validated && doc.validator){
      var newDoc = {};
      var toRemove = {
        _rev: true,
        type: true,
      };
      for(var attr in doc){
        if(!toRemove[attr]){
          newDoc[attr] = doc[attr];
        }
      }
      newDoc.validator = doc[doc.validator];
      emit(doc.from, newDoc);
      emit(doc.to, newDoc);
    }
  }
};

exports.transaction_balances = {
  map: function(doc) {
    if(doc.type && doc.type == 'transaction' && doc.to && doc.amount && doc.from && doc.validated){
      emit(doc.to, doc.amount);
      emit(doc.from, 0 - doc.amount);
    }
  },
  reduce: "_stats"
};
