var Type              = require('couchtypes/types').Type;
var fields            = require('couchtypes/fields');
var widgets           = require('couchtypes/widgets');
var permissions       = require('couchtypes/permissions');
var idField           = require('../Selheure/fields').idField;

exports.user = new Type('user', {
  permissions: {
    update: permissions.loggedIn(),
    remove: permissions.hasRole('_admin')
  },
  fields: {
    id:            idField(/<name>/),
    name:          fields.string(),
    email:         fields.string({
      required: false,
    }),
    tel:           fields.string({
      required: false,
    }),
    localization:  fields.string({
      required: false,
    }),
    created_at:    fields.number(),
    updated_at:    fields.number(),
  },
});
