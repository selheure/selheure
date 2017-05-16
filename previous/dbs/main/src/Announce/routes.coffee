angular.module('announce').
config ($stateProvider, $provide) ->
  $stateProvider.
    state('announcelist',
      url:         '/annonces/liste'
      templateUrl: 'partials/Announces/list.html'
      controller:  'AnnounceListCtrl'
      resolve:
        announces: (Announce) ->
          return Announce.all({
            include_docs: true
          })
    ).
    state('newannounce',
      url:          '/annonces/nouvelle'
      templateUrl:  'partials/Announces/edit.html'
      controller:   'AnnounceEditCtrl'
      loginRequired: true
      resolve:
        announce: -> return {}
    ).
    state('announceedit',
      url:           '/annonces/:id/modifier'
      templateUrl:   'partials/Announces/edit.html'
      controller:    'AnnounceEditCtrl'
      loginRequired: true
      resolve:
        announce: (Announce, $stateParams) ->
          return Announce.all({
            include_docs: true
            key:          $stateParams.id
          }).then (announces) ->
            if announces.length > 0
              return announces[0]
            return {}
    ).
    state('announceshow',
      url: '/annonces/:id/voir'
      templateUrl: 'partials/Announces/list.html'
      controller: 'AnnounceListCtrl'
      resolve:
        announces: (Announce) ->
          return Announce.all({
            include_docs: true
          })
    )

