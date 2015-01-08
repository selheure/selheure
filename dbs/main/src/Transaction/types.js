var Type              = require('couchtypes/types').Type;
var fields            = require('couchtypes/fields');
var widgets           = require('couchtypes/widgets');
var permissions       = require('couchtypes/permissions');
var idField           = require('../Main/fields').idField;
var utils             = require('../Main/utils');

var usernameNotMatchesField = function (field) {
  return function (newDoc, oldDoc, newValue, oldValue, userCtx) {
    if (userCtx.name === field) {
      throw new Error('Username matches field ' + field);
    }
  };
};

var canValidate = function() {
  return permissions.all([
    permissions.any([
      permissions.usernameMatchesField('validatableBy'),
      utils.roleMatchesField('validatableBy')
    ]),
    usernameNotMatchesField('editableBy')
  ]);
}

var canEdit = function() {
  return permissions.any([
    permissions.usernameMatchesField('editableBy'),
    utils.roleMatchesField('editableBy'),
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
    editableBy:       fields.string({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
    declaredBy:    fields.creator(),
    from:           fields.string({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
    amount:         fields.number(),
    executionDate: fields.string({
      required: false,
      permissions: {
        update: canEdit(),
      }
    }),
    message:        fields.string({
      required: false,
      permissions: {
        update: canEdit(),
      }
    }),
    reference:      fields.string({
      required: false,
      permissions: {
        update: canEdit(),
      }
    }),
    createdAt:     fields.createdTime(),
    validated:      fields.boolean({
      permissions: {
        update: canValidate(),
      }
    }),
    validatableBy:      fields.string({
      permissions: {
        update: permissions.fieldUneditable(),
      },
    }),
    validatedBy:    fields.string({
      required: false,
      permissions: {
        update: canValidate(),
      },
    }),
  },
});
