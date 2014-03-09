ng.factory('url', function(config){
  return {
    announceList: config.urlPrefix + '/annonces/liste',
    announceNew: config.urlPrefix + '/annonces/nouvelle',
    announceEdit: function(id) {
      return config.urlPrefix + '/annonce/' + id + '/modifier'
    },
    about: config.urlPrefix + '/apropos',
    contact: config.urlPrefix + '/contact',
    userPage: function(user_name){
      return config.urlPrefix + '/utilisateurs/' + user_name;
    },
    logout: config.urlPrefix + '/logout',
    newTransaction: config.urlPrefix + '/echanges/nouvelle',
    collectiveWork: config.urlPrefix + '/travail_collectif',
  }
});
