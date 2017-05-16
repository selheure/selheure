exports.notification_displayed = function(doc, req) {
  var attr;
  var form = JSON.parse(req.body);
  if(doc === null){
    throw({forbidden: 'Not for creation'});
  } else {
    doc.displayed = true
    return ([doc, 'ok']);
  }
}

exports.notification_send = function(doc, req) {
  var attr;
  var form = JSON.parse(req.body);
  if(doc === null){
    throw({forbidden: 'Not for creation'});
  } else {
    doc.email_sent = true
    return ([doc, 'ok']);
  }
}

exports.notification_create = function(doc, req) {
  var form = JSON.parse(req.body);
  if(doc===null){
    form._id        = 'notification:' + form.id;
    form.type       = 'notification';
    form.created_at = new Date().getTime();
    form.displayed  = false;
    form.email_sent = false;
    return ([form, 'ok']);
  } else {
    throw({forbidden: 'Not for update'});
  }
}

exports.notification_create_contact = function(doc, req) {
  var form = JSON.parse(req.body);
  if(doc===null){
    form._id        = 'notification:' + req.uuid;
    form.type       = 'notification';
    form.created_at = new Date().getTime();
    form.displayed  = false;
    form.email_sent = false;
    form.to         = 'ton-mail-ici';
    return ([form, 'ok']);
  } else {
    throw({forbidden: 'Not for update'});
  }
}
