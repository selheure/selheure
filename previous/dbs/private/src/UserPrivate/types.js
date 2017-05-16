var Type              = require('couchtypes/types').Type;
var fields            = require('couchtypes/fields');
var widgets           = require('couchtypes/widgets');
var permissions       = require('couchtypes/permissions');
var idField           = require('../Selheure-private/fields').idField;
var utils             = require('../Selheure-private/utils');


var syncBotRole = '_admin';
var updateBySyncBotOnly = {
  update: permissions.hasRole(syncBotRole)
}

exports.user = new Type('user', {
  permissions: {
    add:    permissions.hasRole(syncBotRole),  // created by sync from _users only
    update: permissions.loggedIn(),
    remove: permissions.hasRole(syncBotRole)
  },
  fields: {
    id:            idField(/<name>/),
    name:          fields.string({
      permissions: updateBySyncBotOnly
    }),
    email:         fields.string({
      required: false,
      permissions: updateBySyncBotOnly
    }),
    tel:           fields.string({
      required: false,
      permissions: updateBySyncBotOnly
    }),
    localization:  fields.string({
      required: false,
      permissions: updateBySyncBotOnly
    }),
    created_at:    fields.number({
      permissions: updateBySyncBotOnly
    }),
    updated_at:    fields.number({
      permissions: updateBySyncBotOnly
    }),
    locked:        fields.boolean({
      permissions: {
        update: utils.isAppAdmin()
      }
    }),
    resetPassword: fields.boolean({
      permissions: {
        update: utils.isAppAdmin()
      },
      required: false
    }),
  },
});
