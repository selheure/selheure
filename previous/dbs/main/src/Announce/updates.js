exports.announce_edit = function(doc, req) {
  var form = JSON.parse(req.body);
  var field;
  var updated = false;
  if(doc === null){
    // Creation
    form.type       = 'announce';
    form.id         = req.uuid.substr(req.uuid.length -5);
    form._id        = form.type + ':' + form.id;
    form.author     = req.userCtx.name;
    form.created_at = new Date().getTime();
    form.updated_at = form.created_at;
    return [form, 'ok'];
  } else {
    // Modification
    for(field in doc) {
      if(field in form && form[field] != doc[field]) {
        doc[field] = form[field];
        updated = true;
      }
    }
    if(updated) {
      doc.updated_at = new Date().getTime();
    }
    doc.author = req.userCtx.name;
    return [doc, 'ok']
  }
}


exports.announce_delete = function(doc, req) {
  if(doc === null){
    throw "No announce found"
  } else {
    doc._deleted = true;
    doc.updated_at = new Date().getTime();
    doc.author = req.userCtx.name;
    return [doc, 'ok']
  }
}