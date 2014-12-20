exports.transaction_get = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id)
      emit(doc.id, doc);
  }
}

exports.transaction_by_author = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id && doc.validated) {
      emit(doc.to, doc);
      emit(doc.from, doc);
    }
  }
}

exports.transaction_validated_by_author = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id && doc.validated) {
      emit(doc.to, doc);
      emit(doc.from, doc);
    }
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
    if(doc.type && doc.type == "transaction" && !doc.validated){
      emit(doc.from, doc);
      emit(doc.to, doc);
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
