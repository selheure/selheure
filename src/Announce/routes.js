angular.module('announce').
config(function($stateProvider){
  $stateProvider.
    state('announcelist', {
      url:         '/annonces/liste',
      templateUrl: 'partials/Announces/list.html',
      controller:  'AnnounceListCtrl',
      resolve: {
        announces: function(Announce){
          return Announce.all();
        },
        config: function(Config){
          return Config();
        },
      }
    }).
    state('newannounce', {
      url:         '/annonces/nouvelle',
      templateUrl: 'partials/Announces/edit.html',
      controller:  'AnnounceEditCtrl',
      resolve: {
        config: function(Config){
          return Config();
        },
      }
    }).
    state('announceedit', {
      url:         '/annonce/:id/modifier',
      templateUrl: 'partials/Announces/edit.html',
      controller:  'AnnounceEditCtrl',
      resolve: {
        announce: function(Announce, $stateParams) {
          return Announce.get({
            view: 'all',
            key:  $stateParams.announce_id,
          });
        },
        config: function(Config){
          return Config();
        },
      }
    });
});
