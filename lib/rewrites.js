module.exports = [
  {from: '/init', to: '_show/init'},
  {from: '/favicon.ico', to: '/static/favicon.ico'},
  {from: '/partials/*', to: '/partials/*'},
  {from: '/css/*', to: 'static/css/*'},
  {from: '/img/*', to: 'static/img/*'},
  {from: '/js/*', to: 'static/js/*'},
  {from: '/vendor/*', to: 'static/vendor/*'},
  {from: '/modules.js', to: 'modules.js'},
  {from: '/', to: 'partials/index.html'},
  {from: ':db', to: '../../../:db'},
  {from: ':db/:id', to: '../../../:db/:id'},
  {from: '/:db/_design/:dd/*', to: '../../../:db/_design/:dd/*'},
];
