exports.announce_all = {
  map: function(doc) {
    if(doc.type && doc.type == 'announce' && doc.author){
      emit(doc.id, doc);
    }
  }
};

exports.announce_proposal_all = {
  map: function(doc) {
    if(doc.type && doc.type == 'announce' && doc.author && doc.announce_type == 'proposal'){
      emit(doc.author, doc);
    }
  }
};

exports.announce_demand_all = {
  map: function(doc) {
    if(doc.type && doc.type == 'announce' && doc.author && doc.announce_type == 'demand'){
      emit(doc.author, doc);
    }
  }
};

exports.announce_by_date = {
  map: function(doc) {
    if(doc.type && doc.type == 'announce' && doc.created_at){
      emit(doc.created_at, doc._id);
    }
  }
};
