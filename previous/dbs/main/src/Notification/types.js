var Type        = require('couchtypes/types').Type;
var fields      = require('couchtypes/fields');
var permissions = require('couchtypes/permissions');
var idField     = require('../ITS/fields').idField;


exports.notification = new Type('notification', {
  permissions: {
    add: permissions.hasRole('notification_manager'),
    update: permissions.hasRole('notification_manager'),
    remove: permissions.hasRole('notification_manager')
  },
  fields: {
    id: idField(/\d+\-<subscriber>/),
    subscriber: fields.string(),
    message_txt: fields.string({
      require: false
    }),
    message_html: fields.string({
      require: false
    }),
    subject: fields.string({
      require: false
    }),
    created_at: fields.createdTime(),
    displayed: fields.boolean({
      default_value: function (req) {
        return false;
      },
      permissions: {
        update: permissions.usernameMatchesField('subscriber'),
      }
    }),
    email_sent: fields.boolean({
      default_value: function (req) {
        return false;
      },
    })
  }
})

