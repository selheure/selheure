angular.module('db').
factory('db', function($q, $rootScope, $http, config) {
  //$.couch.urlPrefix = "http://127.0.0.1:5984";
  return {
    lib: $.couch,
    currentRequests: {},
    _asyncCall: function(method, argObj, arg) {
      console.log('_asyncCall', method, argObj, arg);
      var deferred = $q.defer();
      //var func = typeof method == 'function' ? method : this.lib[method];
      argObj = argObj ? argObj : {};
      argObj.success = function (data) {
        deferred.resolve(data);
        $rootScope.$apply();
      };
      argObj.error = function (status, message) {
        deferred.reject([status, message]);
        $rootScope.$apply();
      };
      if(arg !== undefined){
        this.lib[method](arg, argObj);
      }
      else {
        this.lib[method](argObj);
      }
      return deferred.promise;
    },
    getView: function(page, view, keys, group, options) {
      var deferred = $q.defer();
      var query = config.db + "/" + page + "/" + view + "/" + group;
      var args = {
        success: function(data) {
          this.jsonp = [query, status, data];
          var result = [];
          //var result = {data: {}};
          //if(keys && keys.length){
          //	result.keys = keys;
          //}
          if(data && data["rows"].length){
            //result.data = data["rows"].map(function(e){ return e.value });
            result = data.rows.map(function(e) { return e.value });
            console.log("resolve", result);
            deferred.resolve(result);
            $rootScope.$apply();
          } else {
            console.log(query, result);
            deferred.resolve(result);
            $rootScope.$apply();
          }
          //TODO: add timeout
          // or use Angular cache
          //delete this.currentRequests[query];
        },
        error: function(status, message) {
          console.log([status, message]);
          deferred.reject([status, message]);
          $rootScope.$apply();
        }
      };
      group = group === undefined ? true : group;
      if(group !== false) {
        args.group = group;
      }
      if(options !== undefined) {
        for(var opt in options){
          args[opt] = options[opt];
        }
      }
      if(keys !== undefined) {
        args[keys[0]] = keys[1];
        query += "/" + keys[0] + "=" + args[keys[0]];
      }
      /*if(query in this.currentRequests){
        console.log("from cache: ", query);
        return this.currentRequests[query];
      }*/
      this.currentRequests[query] = deferred.promise;
      this.lib.db(config.db).view(page + "/" + view, args);
      return this.currentRequests[query];
    },
    getFirstFromView: function(page, view, keys, group){
      return this.getView(page, view, keys, group).then(function(result){
        if(result.length)
          return result[0];
        else
          return null;
      });
    },
    saveDoc: function(doc) {
      var deferred = $q.defer();
      this.lib.db(config.db).saveDoc(doc, {
        success: function(data) {
          deferred.resolve(data);
          $rootScope.$apply();
        },
        error: function(status, message){
          deferred.reject([status, message]);
          $rootScope.$apply();
        },
      });
      return deferred.promise;
      //return this._asyncCall(this.lib.db(config.db).saveDoc, {}, doc);
    },
    openDoc: function(_id) {
      var deferred = $q.defer();
      this.lib.db(config.db).openDoc(_id, {
        success: function(data) {
          deferred.resolve(data);
          $rootScope.$apply();
        },
        error: function(status, message){
          deferred.reject([status, message]);
          $rootScope.$apply();
        },
      });
      return deferred.promise;
      //return this._asyncCall(this.lib.db(config.db).openDoc, {}, _id);
    },
    update: function(appAndFunction, doc) {
      var deferred = $q.defer()
      function onSuccess(result) {
        deferred.resolve(result)
      }
      function onError(error, status, c, request){
        console.log(error, status);
        if(status == 403) {
          switch(error.reason.substr(0, 8)) {
            case 'unauth':
              deferred.reject([403, 'unauthorised']);
              break;
            case 'loginreq':
              deferred.reject([401, 'loginrequired']);
              break;
            case 'missing_':
              deferred.reject([550, error.reason]);
              break;
            case 'changed_':
              deferred.reject([551, error.reason]);
              break;
            case 'archived':
              deferred.reject([450, 'archived']);
              break;
            default:
              console.error("Unknown error code:", error.reason.substr(0, 8));
          }
        } else {
          deferred.reject([status, error])
        }
      }
      var app, func;
      appAndFunction = appAndFunction.split("/");
      if(appAndFunction.length == 1) {
        app = config.db;
        func = appAndFunction[0]
      } else {
        app = appAndFunction[0];
        func = appAndFunction[1];
      }
      console.log('update', app, func, doc);
      var query = '/' + config.db + '/_design/' + app + '/_update/' + func + '/';
      if(typeof doc === 'object' && !doc._id) {
        //$http.post(query, angular.toJson(doc)).success(success).error(error);
        var q = $http.post(query, angular.toJson(doc)).success(onSuccess).error(onError);
        //console.log(q);
        //return q;
        return deferred.promise;
      } else {
        query += doc._id;
        //$http.put(query, angular.toJson(doc)).success(success).error(error);
        $http.put(query, angular.toJson(doc)).success(onSuccess).error(onError);
        return deferred.promise;
      }
    },
    login: function(username, password) {
      return this._asyncCall('login', {
        name: username,
        password: password,
      });
    },
    logout: function() {
      return this._asyncCall('logout');
    },
    session: function() {
      return this._asyncCall('session');
    },
    signup: function(username, password) {
      var deferred = $q.defer();
      var doc = {
        _id: "org.couchdb.user:" + username,
        name: username,
      };
      console.log("signup", doc);
      $.couch.signup(doc, password, {
        success: function(data) {
          deferred.resolve(data);
          $rootScope.$apply();
        },
        error: function(status, message){
          deferred.reject([status, message]);
          $rootScope.$apply();
        },
      });
      return deferred.promise;
    }
  }
});
