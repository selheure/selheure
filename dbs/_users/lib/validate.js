var utils = require('./utils');

exports.validate_doc_update = function(newDoc, oldDoc, userCtx) {
  var hasRole = utils.hasRole(userCtx);

};
