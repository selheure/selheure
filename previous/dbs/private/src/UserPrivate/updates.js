exports.user_unlock = function(doc, req) {
  var form = JSON.parse(req.body);
  if (doc !== null) {
    doc.locked = false;
    return [doc, 'ok'];
  }
  throw({forbidden: 'User does not exist'});
}


exports.user_lock = function(doc, req) {
  var form = JSON.parse(req.body);
  if (doc !== null) {
    doc.locked = true;
    return [doc, 'ok'];
  }
  throw({forbidden: 'User does not exist'});
}


exports.user_resetPwd = function(doc, req) {
  var form = JSON.parse(req.body);
  if (doc !== null) {
    doc.resetPassword = true;
    return [doc, 'ok'];
  }
  throw({forbidden: 'User does not exist'});
}


exports.user_removeResetPwdFlag = function(doc, req) {
  var form = JSON.parse(req.body);
  if (doc !== null) {
    delete doc.resetPassword;
    return [doc, 'ok'];
  }
  //User does not exist
  //gracefully ignored
  return [doc, 'noUser'];
}

exports.user_userData = function(doc, req) {
  var form        = JSON.parse(req.body);
  var toNotchange = ['_id', '_rev', 'type', 'name', 'id', 'locked', 'resetPwd', 'created_at'];
  var time        = new Date().getTime()
  var charToRemove;
  if (doc !== null) {
    if (!form.hasOwnProperty('data')) {
      throw({forbidden: 'Request incomplete'});
    }
    for(var element in doc) {
      if(toNotchange.indexOf(element) < 0){
        if(form.data.hasOwnProperty(element)){
          doc[element] = form.data[element];
          delete form.data[element];
        }
      }
    }
  }
  else {
    // new user
    doc = {}
    log(req);
    doc._id        = req.id;
    doc.type       = 'user';
    charToRemove   = doc.type.length + 1;
    doc.name       = doc._id.substring(charToRemove, doc._id.length);
    doc.id         = doc.name
    doc.locked     = true;
    doc.created_at = time;
  }
  // any case
  for(var element in form.data) {
    if(toNotchange.indexOf(element) < 0){
      doc[element] = form.data[element]
    }
  }
  doc.updated_at = time;
  log(doc);
  return [doc, 'ok'];
}