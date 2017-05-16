var ng = angular.module('ngCouchDB', ['ngResource']);

ng.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

ng.factory('CouchDB', function($resource, $q, $rootScope, $http, $location){
  return function(urldb, name, type){
    var methods = {};
    var errorName = 'DatabaseError';


    if(urldb) {
      urldb = urldb + '/';
    } else {
      urldb = $location.absUrl().split('#')[0];
      if(urldb.charAt(urldb.length) !== '/') {
        urldb = urldb.split('/');
        urldb.pop();
        urldb = urldb.join('/');
        urldb = urldb + '/';
      }
    }

    // View
    methods.views = {
      method: 'GET',
      isArray: true,
      url: urldb + '_design/'+ name +'/_view/'+ type +'_:view',
      transformResponse: function(datas, headerGetter){
        results = [];
        try {
          datas = JSON.parse(datas);
        } catch(e) {
          try {
            datas = JSON.parse(datas);
          } catch(e) {
            console.log(e);
          }
        }
        angular.forEach(datas.rows, function(data){
          if(data.hasOwnProperty('doc')) {
            // include_docs option has been used
            results.push(data.doc)
          } else {
            results.push(data.value)
          }
        });
        return results;
      }
    };

    // GetDoc
    methods.getOne = {
      method: 'GET',
      url: urldb + ':_id',
    };

    // create doc
    methods.createDoc = {
      method: 'POST',
      url: urldb
    };

    // update doc
    methods.updateDoc = {
      method: 'PUT',
      url: urldb + ':_id'
    };

    // Create a resource Object
    var resource = $resource(urldb, {}, methods);

    resource.view = function(params) {
      if(!params){
        params = {};
      }

      var defer = $q.defer();

      // Stringify params
      angular.forEach(params, function(param, key){
        if(key != 'view') {
          this[key] = JSON.stringify(param);
        }
      }, params);

      this.prototype.$views(params).then(function(data){
        defer.resolve(data);
      }, function(err){
        $rootScope.$broadcast(errorName, err);
        defer.reject(err);
      });
      return defer.promise.then(this.view_then, this.view_error);
    }

    // All View
    resource.all = function(params) {
      if(params == undefined){
        params = {};
      }
      params.view = 'all';
      return this.view(params).then(this.all_then, this.all_error)
    }

    // Get View
    resource.get = function(params) {
      var defer = $q.defer();

      if(!params.hasOwnProperty('key')){
        params.key = params.id;
      }
      delete params.id;

      if(!params.hasOwnProperty('view')){
        params.view = 'get';
      }

      this.view(params).then(function(data){
          if(data.length == 0) {
            err = {
              status: 404
            }
            $rootScope.$broadcast(errorName, err)
            defer.reject(err);
          }
          defer.resolve(data[0]);
        },function(err){
          $rootScope.$broadcast(errorName, err)
          defer.reject(err);
        }
      );

      return defer.promise.then(this.get_then, this.get_error);
    }


    // Get Doc
    resource.getDoc = function(params) {
      if(params == undefined || !params.hasOwnProperty('id') && !params.hasOwnProperty('_id')){
        throw 'For getting a document you need to pass his id';
      }

      if(!params.hasOwnProperty('_id') && params.hasOwnProperty('id')) {
        params._id = type+':'+params.id
        delete params.id;
      }

      var defer = $q.defer();

      this.prototype.$getOne(params).then(function(data){
          defer.resolve(data);
        },function(err){
          $rootScope.$broadcast(errorName, err)
          defer.reject(err);
        }
      );

      return defer.promise;
    }

    // _updates
    resource.update = function(params){
      if(!params){
        params = {};
      }

      if(!params.hasOwnProperty('update')){
        throw 'please specify the update to reach';
      }
      if(params.hasOwnProperty('id')) {
        _id = type + ':' + params.id;
      }
      if(params.hasOwnProperty('_id')) {
        _id = params._id;
      }

      if(!params.hasOwnProperty('id') && !params.hasOwnProperty('_id')) {
        _id = '';
      }

      var url = urldb + '_design/'+ name +'/_update/'+ type +'_'+ params.update+'/'+ _id.replace('#', '%23');
      var promise;
      var data = angular.copy(params);
      delete data.update;

      if(params.hasOwnProperty('id') || params.hasOwnProperty('_id')) {
        promise = $http.put(url, data);
      } else {
        promise = $http.post(url, data);
      }

      var defer = $q.defer();

      promise.success(function(response, status, headers, config){
        if(headers().hasOwnProperty('x-couch-update-newrev')) {
          data['_rev'] = headers()['x-couch-update-newrev']
        }
        defer.resolve(data);
      }).error(function(err){
        $rootScope.$broadcast(errorName, err)
        defer.reject(err);
      });

      return defer.promise;
    }

    resource.prototype.$save = function() {
      var defer = $q.defer();

      var save = angular.copy(this);
      if(!this._rev) {
        this.type = type;
        if(this.id) {
          this._id = type + ':' + this.id
        }
        var promise = this.$createDoc();
      }
      else {
        var promise = this.$updateDoc();
      }

      promise.then(function(data){
        // delete the message
        delete data.ok;
        // normalise id and rev
        data._id = data.id;
        delete data.id;
        data._rev = data.rev;
        delete data.rev;
        // delete previous revision
        delete save._rev;
        // merging
        data = angular.extend(data, save);
        defer.resolve(data);
      }, function(err){
        $rootScope.$broadcast(errorName, err)
        defer.reject(err);
      });

      return defer.promise;
    };

    return resource;
  }
});
