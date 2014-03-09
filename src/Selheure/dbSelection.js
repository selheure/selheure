ng.run(function($location, $http, config) {
  if($location.absUrl().indexOf('_rewrite')) {
    config.db = $location.absUrl().split('/')[3];
  } else {
    // vhost
    // host: dev.lupolibero.org -> db: /lupolibero-dev
    config.db = '/lupolibero-' + $location.host().split('.')[0];
  }
})
