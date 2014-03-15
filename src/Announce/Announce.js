angular.module('announce').
factory('announces', function($q, db) {
  return {
    getLastAnnounces: function(nb) {
      var options = {descending: true};
      if(typeof nb == 'number') {
        options.limit = nb;
      }

      return db.getView('selheure', 'announcesByDate', [], false, options).then(
        function(list) {
          var result = [];
          var defCounter = 0;
          var deferred = $q.defer();
          function isFinished(announce) {
            defCounter -= 1;
            if(defCounter <= 0)
              deferred.resolve(result);
            return announce;
          }
          angular.forEach(list, function(_id) {
            defCounter += 1;
            result.push(_this.getAnnounce(_id).then(isFinished));
            //destObject.push(_this.getAnnounce(_id));
        });
        return deferred.promise;
      })
    },
    getAnnounce: function(_id) {
      return db.openDoc(_id);
    }
  }
});
