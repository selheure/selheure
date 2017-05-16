exports.notification_all = {
  map: function(doc) {
    if(doc.type && doc.type == 'notification' && !doc.displayed) {
      emit([doc.displayed, doc.subscriber], doc);
    }
  }
};
