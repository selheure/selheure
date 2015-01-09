exports.announce_all = {
  map: function(doc) {
    if(doc.type && doc.type == 'announce'){
      emit(doc.id, null);
    }
  }
};

exports.announce_by_author = {
  map: function (doc) {
    if(doc.type && doc.type == 'announce' && doc.author){
      emit(doc.author, null);
    }
  }
};