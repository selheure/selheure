exports.transaction_get = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id)
      emit(doc.id, null);
  }
}

exports.transaction_by_author = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id && doc.validated) {
      emit(doc.to,   null);
      emit(doc.from, null);
    }
  }
}

exports.transaction_validated_by_author = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id && doc.validated) {
      emit(doc.to,   null);
      emit(doc.from, null);
    }
  }
}

exports.transaction_all = {
  map: function(doc) {
    if(doc.type == "transaction" && doc._id)
      emit(doc.createdAt, null);
  }
}

exports.transaction_not_validated = {
  map: function(doc) {
    if(doc.type && doc.type == "transaction" && !doc.validated){
      emit(doc.from, null);
      emit(doc.to,   null);
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
