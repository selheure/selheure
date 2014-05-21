exports.user_create = function(doc, req) {
  var form = JSON.parse(req.body);
  if(doc === null){
    var time = new Date().getTime()
    var doc  = {
      _id:           'user:'+form.name,
      type:          'user',
      id:            form.name,
      name:          form.name,
      email:         form.email,
      tel:           form.tel,
      localization:  form.localization,
      created_at:    time,
      updated_at:    time,
    }
    return [doc, 'ok'];
  }
  throw({forbidden: 'Only for creation'});
}
