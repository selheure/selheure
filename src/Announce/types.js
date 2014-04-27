var Type              = require('couchtypes/types').Type;
var fields            = require('couchtypes/fields');
var widgets           = require('couchtypes/widgets');
var permissions       = require('couchtypes/permissions');
var idField           = require('../Selheure/fields').idField;

exports.announce = new Type('announce', {
  permissions: {
    add: permissions.loggedIn(),
    update: permissions.loggedIn(),
    remove: permissions.hasRole('_admin')
  },
  fields: {
    id: idField(/\d+/),
    announce_type: fields.string(),
    author:     fields.creator(),
    category: fields.string(),
    created_at: fields.createdTime(),
    updated_at: fields.number({
      required: false
    }),
    message: fields.string(),
  },
});
