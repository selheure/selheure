var Type              = require('couchtypes/types').Type;
var fields            = require('couchtypes/fields');
var widgets           = require('couchtypes/widgets');
var permissions       = require('couchtypes/permissions');
var idField           = require('../Main/fields').idField;
var utils             = require('../Main/utils');

exports.announce = new Type('announce', {
  permissions: {
    add: permissions.loggedIn(),
    update: permissions.any([
      utils.roleMatchesField('author'),
      permissions.usernameMatchesField('author'),
    ]),
    remove: permissions.any([
      utils.roleMatchesField('author'),
      permissions.usernameMatchesField('author'),
      permissions.hasRole('_admin')
    ]),
  },
  fields: {
    id:             idField(/\w+/),
    announce_type:  fields.string(),
    author:         fields.creator(),
    category:       fields.string(),
    subCategory:    fields.string({
      required: false
    }),
    created_at:     fields.createdTime(),
    updated_at:     fields.number(),
    title:          fields.string(),
    place:          fields.string({
      required: false,
    }),
    message:        fields.string(),
  },
});
