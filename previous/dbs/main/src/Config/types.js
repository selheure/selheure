var Type        = require('couchtypes/types').Type;
var fields      = require('couchtypes/fields');
var permissions = require('couchtypes/permissions');
var idField     = require('../Main/fields').idField;
var isAppAdmin  = require('../Main/utils').isAppAdmin;


exports.config = new Type('config', {
  allow_extra_fields: true,
  permissions: {
    add:    isAppAdmin(),
    update: isAppAdmin(),
    remove: isAppAdmin()
  },
  fields: {
    id: fields.string({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
  },
});
