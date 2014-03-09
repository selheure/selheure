ng.factory('uiLang', function($q, config, db) {
  return {
    translations: {},
    returnCommonAndRequested: function(requested) {
      var obj = angular.copy(this.translations.common);
      return angular.extend(obj, this.translations[requested]);
    },
    getTranslations: function(name) {
      var deferred = $q.defer(),
        _this = this;
      if(name != 'common' && !this.translations['common']) {
        return this.getTranslations('common').then(function(result){
          return _this.getTranslations(name);
        });
      }
      if(name in this.translations) {
        deferred.resolve(this.returnCommonAndRequested(name));
      } else {
        db.openDoc(config.translationDocPrefix + '_' + name + '_' + config.lang).
        then(function(result){
          delete result._id;
          delete result._rev;
          delete result.type;
          _this.translations[name] = result;
          deferred.resolve(_this.returnCommonAndRequested(name));
        }, function(error){
          deferred.reject(error);
        });
      }
      return deferred.promise;
    },
  }
});
