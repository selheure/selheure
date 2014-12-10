exports.email_validation = function (doc, req) {
  var form = JSON.parse(req.body);
  if (doc !== null) {
    if (!form.hasOwnProperty('token')) {
      throw({forbidden: 'Request incomplete'});
    }
    doc.email_validation_token = form.token;
    doc.email_validated = true;

    return [doc, 'ok'];
  }
  throw({forbidden: 'Not for user creation'});
}
