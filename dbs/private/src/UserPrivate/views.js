exports.user_get = {
  map: function(doc) {
    if(doc.type && doc.type == 'user'){
      emit(doc.name, doc);
    }
  }
};


exports.user_all = {
  map: function(doc) {
    if(doc.type && doc.type == 'user'){
      emit(null, {
        name: doc.name
      });
    }
  }
};
