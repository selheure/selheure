exports.transaction_create = function(doc, req) {
  var form = JSON.parse(req.body);
  form.reason = form.reason || {};

  if( doc === null) {
    doc             = {};
    doc.type        = 'transaction';
    doc.id          = req.uuid;
    doc._id         = doc.type+':'+doc.id;
    doc.created_at  = new Date().getTime();
    doc.declared_by = req.userCtx.name;
  }

  doc.to          = form.to || null;
  doc.from        = form.from || null;
  doc.message     = form.reason.text || '';
  doc.reference   = form.reason.announce || '';
  doc.validated   = false;

  if( form.hasOwnProperty('amount')) {
    doc.amount = parseInt(form.amount);
  }

  if (doc.from == req.userCtx.name) {
    doc.validator = doc.from;
    doc.editable  = doc.to;
  } else if (doc.to == req.userCtx.name) {
    doc.validator = doc.to;
    doc.editable  = doc.from;
  } else if (req.userCtx.roles.indexOf(doc.from)) {
    doc.editable  = doc.from;
    doc.validator = doc.to;
    doc.fromgroup = true;
  } else if (req.userCtx.roles.indexOf(doc.to)) {
    doc.editable  = doc.to;
    doc.validator = doc.from;
    doc.togroup   = true;
  }

  doc.togroup   = doc.togroup   || false;
  doc.fromgroup = doc.fromgroup || false;

  return [doc, 'ok'];
}

exports.transaction_validate = function(doc, req) {
  if(doc !== null) {
    if(req.userCtx.name == doc.validator) {
      doc.validated = true;
    } else {
      throw({forbidden: "You are the validator"});
    }
    return [doc, 'ok'];
  }
  throw({forbidden: "Can't update an document that doesn't exist"});
}
