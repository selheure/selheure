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
    id:             idField(/\w+/),
    announce_type:  fields.string(),
    author:         fields.creator(),
    category:       fields.string(),
    created_at:     fields.number(),
    updated_at:     fields.number(),
    title:          fields.string(),
    place:          fields.string({
      required: false,
    }),
    message:        fields.string(),
  },
});
