angular.module('announce').
config(function($stateProvider){
  $stateProvider.
    state('announcelist', {
      url:         '/annonces/liste',
      templateUrl: 'partials/Announces/list.html',
      controller:  'AnnounceListCtrl',
      resolve: {
        announces: function(Announce){
          return Announce.all({
            include_docs: true
          })
        },
        announce: function() { return null },
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
          return Announce.all({
            include_docs: true,
            key:          $stateParams.announce_id,
          })
        },
      }
    });
});
