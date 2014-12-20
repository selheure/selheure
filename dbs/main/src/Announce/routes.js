angular.module('announce').
config(function($stateProvider){
  $stateProvider.
    state('announcelist', {
      url:         '/annonces/liste',
      templateUrl: 'partials/Announces/list.html',
      controller:  'AnnounceListCtrl',
      resolve: {
        announces: function(Announce){
          return Announce.all()
        },
        announce: function() { return null },
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
        announce: function() { return {} },
      }
    }).
    state('announceedit', {
      url:         '/annonces/:id/modifier',
      templateUrl: 'partials/Announces/edit.html',
      controller:  'AnnounceEditCtrl',
      resolve: {
        announce: function(Announce, $stateParams) {
          return Announce.get({
            view: 'full',
            key:  $stateParams.announce_id,
          })
        },
      }
    }).
    state('announceshow', {
      url:         '/annonces/:id/voir',
      templateUrl: 'partials/Announces/list.html',
      controller:  'AnnounceListCtrl',
      resolve: {
        announces: function(Announce){
          return Announce.all()
        },
        announce: function(Announce, $stateParams, login) {
          return Announce.get({
            view: 'full',
            key:  $stateParams.id,
          })
        },
      }
    });
});
