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
        config: function(Selheure){
          return Selheure.getDoc({
            id: 'config'
          });
        },
      }
    }).
    when('/annonces/nouvelle', {
      templateUrl: 'partials/Announces/edit.html',
      controller:  'AnnounceEditCtrl',
      name:        'announce.new',
      resolve: {
        config: function(Selheure){
          return Selheure.getDoc({
            id: 'config'
          });
        },
      }
    }).
    when('/annonce/:id_announce/modifier', {
      templateUrl: 'partials/Announces/edit.html',
      controller:  'AnnounceEditCtrl',
      name:        'announce.edit',
    }).
    otherwise({redirectTo: '/'});
});
