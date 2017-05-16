exports.notifications = function (doc, req) {
  return doc.type && doc.type == 'notification' && !doc.displayed
}
