exports.user_unlock = function(doc, req) {
  var form = JSON.parse(req.body);
  if (doc !== null) {
    var appName = doc._id.split(':')[1].split('.')[0]
    if(doc.roles.indexOf(appName) < 0){
      doc.roles.push(appName);
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
    var index = doc.roles.indexOf(appName);
    if(index >= 0) {
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