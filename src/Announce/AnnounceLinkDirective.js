angular.module('announce').
directive('announceLink', function(url, announces) {
  return {
    restrict: 'AE',
    scope: {id: '='},
    replace: true,
    //template: '<a></a>',
    template: '<span></span>',
    link: function(scope, elm, attrs) {
      console.log('get announce', scope.id)
      var _id = scope.id;
      if(_id !== undefined) {
        //elm.attr('href', url.announce(_id));
        announces.getAnnounce(_id).then(function(doc) {
          elm.html(doc.title);
        });
      }
    }
  }
});
