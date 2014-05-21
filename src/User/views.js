exports.user_get = {
  map: function(doc) {
    if(doc.type && doc.type == 'user'){
      emit(doc.name, doc);
    }
  }
};

