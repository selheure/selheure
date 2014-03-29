exports.validate = function(doc, req) {
  doc.validated = true;
  doc.validated_by = req.userCtx.name;
  return [doc, 'ok'];
};

var has_role = function(user, role) {
  for(var i in user.roles) {
    if(role == user.roles[i])
      return true;
  }
  return false;
}

exports.announce_edit = function(doc, req) {
  var form = JSON.parse(req.body),
    e;
  if(doc === null){
    form.type = 'announce';
    form._id = form.type + '-' + form.id;
    form.author = req.userCtx.name;
    form.created_at = new Date().toISOString();
    form.last_edit_at = form.created_at;
    return [form, 'ok'];
  } else {
    doc.last_edit_at = new Date().toISOString();
    for(e in doc) {
      if(e in form && form[e] != doc[e]) {
        log(e, form[e]);
        doc[e] = form[e];
      }
    }
    return [doc, 'ok']
  }
}

exports.transaction_edit = function(doc, req) {
  var form = JSON.parse(req.body)
  if(doc === null) {
    if(!form.to && form.from != req.userCtx.name){
      form.to = req.userCtx.name;
    }
    form.type = 'transaction';
    form._id = req.uuid;
    form.declared_by = req.userCtx.name;
    form.declared_at = new Date().toISOString();
    form.amount = parseInt(form.amount);
    if(form.declared_by == form.from || has_role(req.userCtx, form.from))
      form.validator = 'to';
    else if(form.declared_by == form.to || has_role(req.userCtx, form.to))
      form.validator = 'from';
    //form.validator = form.declared_by == form.from ? 'to' : 'from';
    return [form, 'ok'];
  } else {
    for(e in doc) {
      if(e in form && form[e] != doc[e]) {
        log(e, form[e]);
        doc[e] = form[e];
      }
    }
    return [doc, 'ok']
  }
}

exports.user = function(doc, req) {
  var form = JSON.parse(req.body)
  if(doc === null) {
    form.type = 'user';
    form.name = form.id;
    form._id = form.type + '-' + form.id;
    return [form, 'ok'];
  } else {

    return [doc, 'ok'];
  }
}


