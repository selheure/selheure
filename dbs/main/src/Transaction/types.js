var Type              = require('couchtypes/types').Type;
var fields            = require('couchtypes/fields');
var widgets           = require('couchtypes/widgets');
var permissions       = require('couchtypes/permissions');
var idField           = require('../Selheure/fields').idField;
var utils             = require('../Selheure/utils');

var usernameOrRoleMatchesField = function(field) {
  return permissions.any([
    permissions.usernameMatchesField(field),
    utils.roleMatchesField(field),
  ]);
}

exports.transaction = new Type('transaction', {
  permissions: {
    add:    permissions.loggedIn(),
    update: permissions.loggedIn(),
    remove: permissions.hasRole('_admin')
  },
  fields: {
    id:             idField(/\w+/),
    to:             fields.string({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
    editable:       fields.string({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
    declared_by:    fields.creator(),
    from:           fields.string({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
    togroup:        fields.boolean({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
    fromgroup:      fields.boolean({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
    amount:         fields.number(),
    execution_date: fields.string({
      required: false,
      permissions: {
        update: usernameOrRoleMatchesField('declared_by'),
      }
    }),
    message:        fields.string({
      required: false,
      permissions: {
        update: usernameOrRoleMatchesField('declared_by'),
      }
    }),
    reference:      fields.string({
      required: false,
      permissions: {
        update: usernameOrRoleMatchesField('declared_by'),
      }
    }),
    created_at:     fields.createdTime(),
    validated:      fields.boolean({
      permissions: {
        update: usernameOrRoleMatchesField('validator'),
      }
    }),
    validator:      fields.string({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
  },
});
