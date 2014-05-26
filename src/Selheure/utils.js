var _ = require('underscore')._;

exports.assert = function (assertion, message) {
  if(assertion === false)
    throw new Error(message || 'unauth');
}

exports.reExports = function (exports, path) {
  var exported = require(path)
  for(var element in exported) {
    exports[element] = exported[element];
  }
}

exports.hasRole = function (user) {
  return function (role) {
    var roles = user ? (user.roles || []): [];
    return _.include(roles, role);
  }
}

exports.roleMatchesField = function (path) {
    if (!_.isArray(path)) {
        path = [path];
    }
    return function (newDoc, oldDoc, newVal, oldVal, userCtx) {
        var role = utils.getPropertyPath(oldDoc, path);
        var roles = userCtx ? (userCtx.roles || []): [];
        if (!_.include(roles, role)) {
            throw new Error('User must have "' + role + '" role.');
        }
    };
};
