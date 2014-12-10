exports.announce_all = {
  map: function(doc) {
    if(doc.type && doc.type == 'announce' && doc.author){
      var catTab = doc.category.split("-");
      var toEmit = {};
      var exclude = {"message" : null, "type": null}
      for(var element in doc) {
        if(exclude.hasOwnProperty(element)){
          continue;
        }
        switch(element) {
          case "announce_type":
            toEmit.type = doc[element];
            break;
          case "category":
            toEmit.category = catTab[0];
            break;
          default:
            toEmit[element] = doc[element];
            break;
        }
      }
      if(catTab.length > 1) {
        toEmit.subCategory = catTab[1];
      }
      emit(doc.id, toEmit);
    }
  }
};

exports.announce_full = {
  map: function(doc) {
    if(doc.type && doc.type == 'announce' && doc.author){
      var catTab = doc.category.split("-");
      var toEmit = {};
      var exclude = {"type": null}
      for(var element in doc) {
        if(exclude.hasOwnProperty(element)){
          continue;
        }
        switch(element) {
          case "announce_type":
            toEmit.type = doc[element];
            break;
          case "category":
            toEmit.category = catTab[0];
            break;
          default:
            toEmit[element] = doc[element];
            break;
        }
      }
      if(catTab.length > 1) {
        toEmit.subCategory = catTab[1];
      }
      emit(doc.id, toEmit);
    }
  }
};

exports.announce_by_author = {
  map: function(doc) {
    if(doc.type && doc.type == 'announce' && doc.author){
      emit(doc.author, doc);
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
