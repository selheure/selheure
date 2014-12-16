exports.user_unlock = function(doc, req) {
  var form = JSON.parse(req.body);
  if (doc !== null) {
    if (!form.hasOwnProperty('app')) {
      throw({forbidden: 'Request incomplete'});
    }
    if(doc.roles.indexOf(form.app) < 0){
      doc.roles.push(form.app);
    }

    return [doc, 'ok'];
  }
  //User does not exist
  //gracefully ignored
  return [doc, 'noUser'];
}

exports.user_lock = function(doc, req) {
  var form = JSON.parse(req.body);
  if (doc !== null) {
    if (!form.hasOwnProperty('app')) {
      throw({forbidden: 'Request incomplete'});
    }
    var index = doc.roles.indexOf(form.app);
    if(index > 0) {
      doc.roles.splice(index, 1)
    }
    return [doc, 'ok'];
  }
  //User does not exist
  //gracefully ignored
  return [doc, 'noUser'];
}


exports.reset_password = function(doc, req) {
  var form = JSON.parse(req.body);
  if (doc !== null) {
    if (!form.hasOwnProperty('pwd')) {
      throw({forbidden: 'Request incomplete'});
    }
    doc.password = form.pwd

    return [doc, 'ok'];
  }
  //User does not exist
  //gracefully ignored
  return [doc, 'noUser'];
}