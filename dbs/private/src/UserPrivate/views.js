exports.user_get = {
  map: function(doc) {
    if(doc.type && doc.type == 'user'){
      emit(doc.name, null);
    }
  }
};


exports.user_all = {
  map: function(doc) {
    if(doc.type && doc.type == 'user'){
      emit(null, doc.name);
    }
  }
};
