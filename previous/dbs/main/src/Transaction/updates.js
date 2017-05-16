exports.transaction_create = function(doc, req) {
  var form = JSON.parse(req.body);
  form.reason = form.reason || {};

  if( doc === null) {
    doc             = {};
    doc.type        = 'transaction';
    doc.id          = req.uuid;
    doc._id         = doc.type+':'+doc.id;
    doc.createdAt  = new Date().getTime();
    doc.declaredBy = req.userCtx.name;
  }

  doc.to          = form.to || null;
  doc.from        = form.from || null;
  doc.message     = form.reason.text || '';
  doc.reference   = form.reason.announce || '';
  doc.validated   = false;

  if( form.hasOwnProperty('amount')) {
    doc.amount = parseInt(form.amount);
  }

  if (doc.from == req.userCtx.name || req.userCtx.roles.indexOf(doc.from) > -1) {
    doc.editableBy      = doc.from;
    doc.validatableBy   = doc.to;
  } else if (doc.to == req.userCtx.name || req.userCtx.roles.indexOf(doc.to) > -1) {
    doc.editableBy      = doc.to;
    doc.validatableBy   = doc.from;
  }

  return [doc, 'ok'];
}

exports.transaction_validate = function(doc, req) {
  if(doc !== null) {
    if(req.userCtx.name == doc.validatableBy || req.userCtx.roles.indexOf(doc.validatableBy) != -1) {
      doc.validated   = true;
      doc.validatedBy = req.userCtx.name

    } else {
      throw({forbidden: "You are allowed to validate this transaction"});
    }
    return [doc, 'ok'];
  }
  throw({forbidden: "Can't update a document that doesn't exist"});
}
