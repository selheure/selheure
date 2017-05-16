exports.user_get = {
  map: function(doc) {
    if(doc.type && doc.type == 'user'){
      emit(doc.name, null);
    }
  }
};


exports.user_all = {
  map: function(doc) {
    if(doc.type) {
      if(doc.type == 'user' || doc.type == 'group'){
        emit(null, doc.name);
      }
    }
  }
};
