angular.module('user').
config( ($stateProvider) ->
  $stateProvider
    .state('userpage', {
      url:         '/user/:name'
      templateUrl: 'partials/User/page.html'
      controller:  'UserPageCtrl'
      resolve: {
        user: (User, $stateParams)->
          return User.get({
            key: $stateParams.name
          })
      }
    })
)
