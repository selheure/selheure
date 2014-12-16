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

exports.roleMatchesField = function (role) {
    return function (newDoc, oldDoc, newVal, oldVal, userCtx) {
        var roles = userCtx ? (userCtx.roles || []): [];
        if (!_.include(roles, role)) {
            throw new Error('User must have "' + role + '" role.');
        }
    };
};


exports.isAppAdmin = function () {
    return function (newDoc, oldDoc, newVal, oldVal, userCtx) {
        var roles = userCtx ? (userCtx.roles || []): [];
        var db = userCtx ? userCtx.db : "";
        var splitted = db.split("-");
        if(splitted[splitted.length-1] == "private") {
          splitted.pop();
          db = splitted.join('-');
        }
        var appAdminRole = db + "_admin"
        if (!_.include(roles, appAdminRole)) {
            throw new Error('User is not App admin (role: ' + appAdminRole);
        }
    };
};