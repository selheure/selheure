exports.announcesByDate = {
  map: function(doc) {
    if(doc.type && doc.type == "announce" && doc.created_at){
      emit(doc.created_at, doc._id);
    }
  }
};

exports.announce_all = {
  map: function(doc) {
    if(doc.type && doc.type == "announce" && doc.author && doc.announce_type == 'demand'){
      emit(doc.author, doc);
    }
  }
};

exports.proposal_announce_list = {
  map: function(doc) {
    if(doc.type && doc.type == "announce" && doc.author && doc.announce_type == 'proposal'){
      emit(doc.author, doc);
    }
  }
};

exports.announcesByUserDate = {
  map: function(doc) {
    if(doc.type && doc.type == "announce" && doc.author){
      emit([doc.author, doc.created_at], doc._id);
    }
  }
};

exports.announce_ids = {
  map: function(doc) {
    if(doc.type && doc.type == 'announce' && doc.id) {
      emit(null, doc.id);
    }
  },
  reduce: "_stats",
};

exports.balances = {
  map: function(doc) {
    if(doc.type && doc.type == 'transaction' && doc.to && doc.amount && doc.from && doc.validated){
      emit(doc.to, doc.amount);
      emit(doc.from, 0 - doc.amount);
    }
  },
  reduce: "_sum"
};

exports.user_list = {
  map: function(doc) {
    if(doc.type && doc.type == 'user' && doc.id){
      emit(doc.id, doc);
    }
  }
};

exports.username_list = {
  map: function(doc) {
    if(doc.type && doc.type == 'user' && doc.id){
      emit(doc.id, doc.id);
    }
  }
};

exports.user_transaction_list = {
  map: function(doc) {
    if(doc.type && doc.type == "transaction" && doc.from && doc.to){
      emit([doc.from, doc.declared_at], doc._id);
      emit([doc.to, doc.declared_at], doc._id);
    }
  }
};

exports.user_validated_transaction_list = {
  map: function(doc) {
    if(doc.type && doc.type == "transaction" && doc.from && doc.to && doc.validated){
      emit([doc.from, doc.declared_at], doc._id);
      emit([doc.to, doc.declared_at], doc._id);
    }
  }
};

exports.user_non_validated_transaction_list = {
  map: function(doc) {
    if(doc.type && doc.type == "transaction" && doc.from && doc.to && !doc.validated){
      emit([doc.from, doc.declared_at], doc._id);
      emit([doc.to, doc.declared_at], doc._id);
    }
  }
};

exports.transaction_list = {
  map: function(doc) {
    if(doc.type == "transaction" && doc.declared_at && doc._id)
      emit(doc.declared_at, doc._id)
  }
}

exports.non_validated_transactions = {
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

/*
{
  "list": {
      "map": "function(doc) {\n  if(doc.type && doc.type == \"announce\" && doc.author){\n    emit(doc.author, doc);\n  }\n}"
  },
  "ids": {
      "map": "function(doc) {\n  if(doc.type && doc.type == 'announce' && doc.id)\n    emit(null, doc.id);\n}",
      "reduce": "_stats"
  },
  "balances": {
      "map": "	function(doc) {\n  if(doc.type && doc.type == 'transaction' && doc.to && doc.amount && doc.from){\n    emit(doc.to, doc.amount);\n    emit(doc.from, 0 - doc.amount);\n  }\n}",
      "reduce": "_sum"
  },
  "user_list": {
      "map": "function(doc) {\n  if(doc.type && doc.type == 'user' && doc.id){\n    emit(doc.id, doc);\n  }\n}"
  }
}
*/
