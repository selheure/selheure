angular.module('announce').
config(function($routeProvider){
  $routeProvider.
    when('/annonces/liste', {
      templateUrl: 'partials/Announces/list.html',
      controller:  'AnnounceListCtrl',
      name:        'announce.list',
      resolve: {
        announces: function(Announce){
          return Announce.all();
        },
        config: function(Config){
          return Config();
        },
      }
    }).
    when('/annonces/nouvelle', {
      templateUrl: 'partials/Announces/edit.html',
      controller:  'AnnounceEditCtrl',
      name:        'announce.new',
      resolve: {
        config: function(Config){
          return Config();
        },
      }
    }).
    when('/annonce/:announce_id/modifier', {
      templateUrl: 'partials/Announces/edit.html',
      controller:  'AnnounceEditCtrl',
      name:        'announce.edit',
      resolve: {
        announce: function(Announce, $route) {
          return Announce.get({
            view: 'all',
            key:  $route.current.params.announce_id,
          });
        },
        config: function(Config){
          return Config();
        },
      }
    }).
    otherwise({redirectTo: '/'});
});
