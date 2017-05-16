angular.module('announce').
factory('Announce', function(CouchDB, db, User){
  Announce = CouchDB(db.main.url, db.main.appName, 'announce')

  Announce.all_then = function(announces){
    for(var id in announces){
      announces[id].author = User.getName(announces[id].author)
    }
    return announces;
  }

  Announce.get_then = function(announce){
    announce.author = User.getName(announce.author)
    return announce;
  }

  Announce.view_then = function(announces) {
    for(var id in announces){
      announces[id].author = User.getName(announces[id].author)
    }
    return announces;
  }

  return Announce
});
