var Type              = require('couchtypes/types').Type;
var fields            = require('couchtypes/fields');
var widgets           = require('couchtypes/widgets');
var permissions       = require('couchtypes/permissions');
var idField           = require('../Selheure/fields').idField;

exports.transaction = new Type('transaction', {
  permissions: {
    add: permissions.loggedIn(),
    update: permissions.loggedIn(),
    remove: permissions.hasRole('_admin')
  },
  fields: {
    id:           idField(/\w+/),
    to:           fields.string(),
    editable:     fields.string(),
    declared_by:  fields.creator(),
    from:         fields.string(),
    togroup:      fields.boolean(),
    fromgroup:    fields.boolean(),
    amount:       fields.number(),
    message:      fields.string({
      required: false,
    }),
    reference:    fields.string({
      required: false,
    }),
    created_at:   fields.createdTime(),
    validated:    fields.boolean(),
    validator:    fields.string(),
  },
});
