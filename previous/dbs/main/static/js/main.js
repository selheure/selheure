angular.module('announce', ['ui.router', 'ngCouchDB', 'category']);

angular.module('category', []);

angular.module('configuration', []);

angular.module('directive', []);

angular.module('login', ['ngCouchDB', 'ui.bootstrap', 'user']);

angular.module('selheure', ['ui.router', 'notification', 'translation', 'transaction', 'announce', 'login', 'user', 'dbSelect', 'configuration']).value('db', {}).value("errors", {
  loginRequired: "Vous devez être connecté(e) pour accéder à cette page",
  unauthorized: "Vous n'êtes pas autorisé(e) à accéder à cette page",
  unknownError: "Une erreur inattendue est survenue. Veuillez nous contacter en nous signalant le plus précisément possible ce qui s'est produit."
});

angular.module('notification', ['ngAnimate', 'translation']);

angular.module('transaction', ['user']);

angular.module('translation', ['gettext', 'angularSpinner', 'directive']);

angular.module('url', []);

angular.module('user', ['transaction', 'announce']);

angular.module('dbSelect', []);

angular.module('announce').config([
  "$provide", function($provide) {
    return $provide.decorator("$exceptionHandler", [
      "$delegate", function($delegate) {
        return function(exception, cause) {
          return console.log("announce exception", exception.message);
        };
      }
    ]);
  }
]);

angular.module('selheure').config([
  "$provide", function($provide) {
    return $provide.decorator("$exceptionHandler", function($delegate, $injector, errors) {
      return function(exception, cause) {
        var $state, notification;
        $state = $injector.get("$state");
        notification = $injector.get("notification");
        if (errors.hasOwnProperty(exception.message)) {
          return notification.setAlert(errors[exception.message], 'danger');
        } else {
          return $delegate(exception, cause);
        }
      };
    });
  }
]);

angular.module('announce').config(function($stateProvider, $provide) {
  return $stateProvider.state('announcelist', {
    url: '/annonces/liste',
    templateUrl: 'partials/Announces/list.html',
    controller: 'AnnounceListCtrl',
    resolve: {
      announces: function(Announce) {
        return Announce.all({
          include_docs: true
        });
      }
    }
  }).state('newannounce', {
    url: '/annonces/nouvelle',
    templateUrl: 'partials/Announces/edit.html',
    controller: 'AnnounceEditCtrl',
    loginRequired: true,
    resolve: {
      announce: function() {
        return {};
      }
    }
  }).state('announceedit', {
    url: '/annonces/:id/modifier',
    templateUrl: 'partials/Announces/edit.html',
    controller: 'AnnounceEditCtrl',
    loginRequired: true,
    resolve: {
      announce: function(Announce, $stateParams) {
        return Announce.all({
          include_docs: true,
          key: $stateParams.id
        }).then(function(announces) {
          if (announces.length > 0) {
            return announces[0];
          }
          return {};
        });
      }
    }
  }).state('announceshow', {
    url: '/annonces/:id/voir',
    templateUrl: 'partials/Announces/list.html',
    controller: 'AnnounceListCtrl',
    resolve: {
      announces: function(Announce) {
        return Announce.all({
          include_docs: true
        });
      }
    }
  });
});

angular.module('user').config(function($stateProvider) {
  return $stateProvider.state('configedit', {
    url: '/configuration',
    templateUrl: 'partials/Config/edit.html',
    controller: 'ConfigEditCtrl'
  });
});

angular.module('selheure').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl',
    resolve: {
      transactions: function(Transaction, Announce) {
        return Transaction.all({
          limit: 10,
          descending: true,
          include_docs: true
        }).then(function(list) {
          var e, i;
          for (i in list) {
            e = list[i];
            if (list[i].hasOwnProperty('reference') && list[i].reference) {
              (function(element) {
                return Announce.get({
                  view: 'all',
                  key: element.reference,
                  include_docs: true
                }).then(function(announce) {
                  return element.message = announce.title;
                });
              })(list[i]);
            }
          }
          return list;
        });
      },
      announces: function(Announce) {
        return Announce.all({
          include_docs: true,
          limit: 10,
          descending: true
        });
      }
    }
  });
  return $urlRouterProvider.otherwise('/');
});

angular.module('transaction').config(function($stateProvider) {
  return $stateProvider.state('declare', {
    url: '/echanges/nouvelle',
    templateUrl: 'partials/Transactions/declare.html',
    controller: 'DeclareCtrl',
    loginRequired: true,
    resolve: {
      userList: function(User) {
        return User.all();
      }
    }
  }).state('declare-participation', {
    url: '/echanges/participation',
    templateUrl: 'partials/Transactions/declare_participation.html',
    controller: 'DeclareCtrl',
    loginRequired: true,
    resolve: {
      userList: function(User) {
        return User.all();
      },
      participation: function() {
        return true;
      }
    }
  }).state('transactionedit', {
    url: '/echanges/:id/editer',
    templateUrl: 'partials/Transactions/declare.html',
    controller: 'DeclareCtrl',
    resolve: {
      transaction: function(Transaction, $stateParams) {
        return Transaction.get({
          key: $stateParams.id,
          include_docs: true
        });
      },
      userList: function(User) {
        return User.all();
      }
    }
  }).state('work', {
    url: '/travail_collectif',
    templateUrl: 'partials/Transactions/collectivework.html',
    controller: 'CollectiveWorkCtrl',
    resolve: {
      config: function(Config) {
        return Config();
      },
      announces: function(Announce) {
        return Announce.view({
          view: 'by_author',
          key: 'CRIC',
          include_docs: true
        });
      }
    }
  });
});

angular.module('user').config(function($stateProvider, $qProvider) {
  return $stateProvider.state('userpage', {
    url: '/user/:name',
    templateUrl: 'partials/User/page.html',
    controller: 'UserPageCtrl',
    resolve: {
      transactions: function(Transaction, $stateParams, User) {
        return Transaction.view({
          view: 'validated_by_author',
          key: User.getId($stateParams.name),
          limit: 10,
          descending: true,
          include_docs: true
        });
      },
      announces: function(Announce, $stateParams, User) {
        return Announce.view({
          view: 'by_author',
          key: User.getId($stateParams.name),
          limit: 10,
          descending: true,
          include_docs: true
        });
      },
      notValidated: function(Transaction, $stateParams, User) {
        return Transaction.view({
          view: 'not_validated',
          key: User.getId($stateParams.name),
          limit: 10,
          descending: true,
          include_docs: true
        });
      },
      user: function(User, $stateParams, $q) {
        var deferred;
        deferred = $q.defer();
        User.get({
          key: $stateParams.name,
          include_docs: true
        }).then((function(_this) {
          return function(result) {
            return deferred.resolve(result);
          };
        })(this), (function(_this) {
          return function(err) {
            return deferred.resolve({
              name: $stateParams.name
            });
          };
        })(this));
        return deferred.promise;
      },
      balance: function(Transaction, $stateParams, User) {
        return Transaction.view({
          view: 'balances',
          key: User.getId($stateParams.name)
        });
      }
    }
  }).state('userlist', {
    url: '/utilisateurs/',
    templateUrl: 'partials/User/list.html',
    controller: 'UserListCtrl',
    resolve: {
      users: function(User) {
        return User.view({
          view: 'get',
          include_docs: true
        });
      }
    }
  });
});

angular.module('selheure').run(function($rootScope, $state, $injector, config, db, DbSelect) {
  var login;
  DbSelect.setDbConfig('selheure', db, ['private']);
  config.load('selheure', db.main.url);
  login = $injector.get("login");
  $rootScope.$on('$stateChangeError', (function(_this) {
    return function(event, toState, toParams, fromState, fromParams, error) {
      $state.go(fromState, fromParams);
      switch (error.status) {
        case 401:
          throw new Error('unauthorized');
          break;
        case 403:
          throw new Error('unauthorized');
          break;
        case 0:
          throw new Error('connectionLost');
      }
    };
  })(this));
  return $rootScope.$on('$stateChangeStart', (function(_this) {
    return function(event, toState, toParams, fromState, fromParams) {
      if ((toState.loginRequired || toState.roleRequired) && !login.isConnected()) {
        event.preventDefault();
        throw new Error('loginRequired');
      }

      /*
      if toState.roleRequired? and !login.hasRole(toState.roleRequired)
       */
    };
  })(this));
});

angular.module('translation').run(function(gettextCatalog, Local, $rootScope) {
  return $rootScope.$on('$ChangeLanguage', function($event, language) {
    return Local.getDoc({
      id: language
    }).then(function(data) {
      gettextCatalog.setStrings(language, data);
      gettextCatalog.currentLanguage = language;
      return $rootScope.$broadcast('$translateChangeSuccess', language);
    }, function(err) {
      if (language !== 'en') {
        return $rootScope.$broadcast('$translateChangeError', language);
      }
    });
  });
});

angular.module('announce').
factory('Announce', function(CouchDB, db, User){
  Announce = CouchDB(db.main.url, db.main.appName, 'announce')

  Announce.all_then = function(announces){
    for(var id in announces){
      announces[id].author = User.getName(announces[id].author)
    }
    return announces;
  }

  Announce.get_then = function(announce){
    announce.author = User.getName(announce.author)
    return announce;
  }

  Announce.view_then = function(announces) {
    for(var id in announces){
      announces[id].author = User.getName(announces[id].author)
    }
    return announces;
  }

  return Announce
});

angular.module('announce').
controller('AnnounceEditCtrl', function($scope, $state, config, Announce, login, notification, announce) {
  $scope.announce      = announce || {}
  $scope.announceTypes = config.get('announceTypes');
  $scope.categories    = config.get('categories');

  if(announce.hasOwnProperty('author')) {
    if(announce.author != login.getName()) {
      $scope.notAllowed = true;
    }
  }
  $scope.selected = {};

  $scope.isEmpty = function (obj) {
    for (var i in obj) if (obj.hasOwnProperty(i)) return false;
    return true;
};

  $scope.announceSubmit = function() {
    announce = $scope.announce;
    if(
      announce.announce_type == null ||
      announce.category      == null ||
      announce.title         == null ||
      announce.message       == null
    ) {
      notification.addAlert('Veuillez remplir tous les champs obligatoires', 'danger');
      return false;
    }
    announce.update = 'edit';
    Announce.update(announce).then(
      function(data) {
        $state.go('announceshow', {id: $scope.announce.id});
      }, function(err) {
        console.log(err);
      }
    );
  }
});

angular.module('announce').controller('AnnounceListCtrl', function($scope, $stateParams, $location, $anchorScroll, $modal, config, login, Announce, announces) {
  var modalInstance;
  $scope.selected = {};
  $scope.announces = announces;
  $scope.announceTypes = config.get('announceTypes');
  $scope.categories = config.get('categories');
  if ($stateParams.id != null) {
    modalInstance = $modal.open({
      templateUrl: 'partials/Announces/show.html',
      controller: 'AnnounceShowCtrl',
      resolve: {
        announce: function() {
          var announce, _i, _len;
          for (_i = 0, _len = announces.length; _i < _len; _i++) {
            announce = announces[_i];
            if (announce.id === $stateParams.id) {
              return announce;
            }
          }
          throw "Announce not found";
        }
      }
    });
  }
  $scope.canEdit = function(announce) {
    if (announce == null) {
      return false;
    }
    return login.isAuthorized(announce.author);
  };
  $scope.canDelete = function(announce) {
    return $scope.canEdit(announce);
  };
  return $scope["delete"] = function(announce) {
    if (!$scope.canDelete(announce)) {
      console.error("Not authorized");
      return;
    }
    announce.update = 'delete';
    return Announce.update(announce).then(function(data) {
      var idx;
      idx = $scope.announces.indexOf(announce);
      return $scope.announces.splice(idx, 1);
    }, function(err) {
      return console.log(err);
    });
  };
});

angular.module('announce').controller('AnnounceShowCtrl', function($scope, $modalInstance, config, announce) {
  $scope.announce = announce;
  $scope.categories = config.get('categories');
  return $scope.cancel = function() {
    return $modalInstance.dismiss('cancel');
  };
});

angular.module('announce').
controller('AnnounceTableCtrl', function($scope, config) {
  $scope.announceTypes = config.get('announceTypes');
  $scope.categories    = config.get('categories');
});

angular.module('announce').
directive('announces', function(config) {
  return {
    restrict: 'E',
    scope: {
      announces:   '=',
      types:       '=',
      category:    '=',
      subcategory: '=',
    },
    templateUrl: 'partials/Announces/table.html',
  }
});

angular.module('announce').filter('types', function() {
  return function(announces, types) {
    var announce, results, _i, _len;
    if (types != null) {
      results = [];
      for (_i = 0, _len = announces.length; _i < _len; _i++) {
        announce = announces[_i];
        if (announce.announce_type === types) {
          results.push(announce);
        }
      }
      return results;
    } else {
      return announces;
    }
  };
});




angular.module('category').
directive('category', function() {
  return {
    restrict: 'E',
    scope: {
      'options': '=',
      'model':   '=',
    },
    replace: true,
    template: 	'<select ng-model="model" ng-options="id as obj.name for (id, obj) in options">' +
            '<option value=""></option>' +
          '</select>',
  }
});

angular.module('category').filter('category', function() {
  return function(announces, category, subCategory) {
    var announce, results, _i, _j, _len, _len1;
    results = [];
    if (subCategory) {
      for (_i = 0, _len = announces.length; _i < _len; _i++) {
        announce = announces[_i];
        if (announce.subCategory === subCategory) {
          results.push(announce);
        }
      }
    } else if (category) {
      for (_j = 0, _len1 = announces.length; _j < _len1; _j++) {
        announce = announces[_j];
        if (announce.category === category) {
          results.push(announce);
        }
      }
    } else {
      results = announces;
    }
    return results;
  };
});

angular.module('category').
directive('subCategory', function() {
  return {
    restrict: 'E',
    scope: {
      'options': '=',
      'model':  '=',
    },
    replace: true,
    template: '<select ng-model="model" ng-options="id as name for (id, name) in options">' +
                '<option value=""></option>' +
              '</select>'
  }
});

angular.module('configuration').factory('config', function($http, $location, $q) {
  return {
    _confObj: {},
    _buildUrl: function() {
      return "" + this._baseUrl + "/config:" + this._appName;
    },
    _updateConfObject: function(newConf) {
      return angular.extend(this._confObj, newConf);
    },
    load: function(appName, baseUrl) {
      this._appName = appName;
      this._baseUrl = baseUrl;
      return $http.get(this._buildUrl(), {
        cache: true
      }).then((function(_this) {
        return function(result) {
          _this._updateConfObject(result.data);
          return result.data;
        };
      })(this));
    },
    get: function(item) {
      return this._confObj[item];
    },
    saveAsNewConfiguration: function(newConf) {
      var item, _i, _len, _ref;
      _ref = ['_id', '_rev', 'type', 'id'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        newConf[item] = this._confObj[item];
      }
      newConf._;
      return $http.put(this._buildUrl(), newConf).then((function(_this) {
        return function(result) {
          _this._updateConfObject(newConf);
          _this._confObj._rev = result.data.rev;
          return console.log("new conf", result, newConf);
        };
      })(this), (function(_this) {
        return function(err) {
          console.error(err);
          return err;
        };
      })(this));
    }
  };
});

angular.module('configuration').controller('ConfigEditCtrl', function($scope, config, login) {
  var item, newTypeBaseId, nextId, _i, _len, _ref;
  newTypeBaseId = 'zzznew';
  $scope.removedFlag = "REMOVED";
  $scope.newConfig = {};
  _ref = ['collectiveUser', 'announceTypes', 'categories', 'currency'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    item = _ref[_i];
    $scope.newConfig[item] = angular.copy(config.get(item));
  }
  console.log(config);
  $scope.addAnnounceType = function() {
    var num;
    num = 0;
    while ($scope.newConfig.announceTypes.hasOwnProperty(newTypeBaseId + num)) {
      num++;
    }
    return $scope.newConfig.announceTypes[newTypeBaseId + num] = "";
  };
  $scope.removeType = function(key) {
    return delete $scope.newConfig.announceTypes[key];
  };
  nextId = function(strNum) {
    var num;
    console.log(strNum);
    num = parseInt(strNum);
    if (num < 0) {
      num = 0;
    }
    strNum = '' + (num + 1);
    if (strNum.length < 2) {
      strNum = "0" + strNum;
    }
    return strNum;
  };
  $scope.switchOpenedCategory = function(key) {
    if ($scope.openedCategory === key) {
      return $scope.openedCategory = "";
    } else {
      return $scope.openedCategory = key;
    }
  };
  $scope.addCategory = function() {
    var newId;
    newId = nextId(Object.keys($scope.newConfig.categories).length - 2);
    while ($scope.newConfig.categories.hasOwnProperty(newId)) {
      newId = nextId(newId);
    }
    return $scope.newConfig.categories[newId] = {
      name: "",
      sub: {}
    };
  };
  $scope.removeCategory = function(key) {
    var id, sub, _ref1, _results;
    $scope.newConfig.categories[key].name = $scope.removedFlag;
    _ref1 = $scope.newConfig.categories[key].sub;
    _results = [];
    for (id in _ref1) {
      sub = _ref1[id];
      _results.push($scope.newConfig.categories[key].sub[id] = $scope.removedFlag);
    }
    return _results;
  };
  $scope.addSubCategory = function(catId) {
    var newId;
    newId = nextId(Object.keys($scope.newConfig.categories[catId].sub).length - 2);
    while ($scope.newConfig.categories[catId].sub.hasOwnProperty(newId)) {
      newId = nextId(newId);
    }
    return $scope.newConfig.categories[catId].sub[newId] = "";
  };
  $scope.removeSubCategory = function(key, keySub) {
    return $scope.newConfig.categories[key].sub[keySub] = $scope.removedFlag;
  };
  $scope.configSubmit = function() {
    var id, newConfig, type, _ref1;
    newConfig = $scope.newConfig;
    _ref1 = newConfig.announceTypes;
    for (id in _ref1) {
      type = _ref1[id];
      if (id.indexOf(newTypeBaseId) === 0) {
        newConfig.announceTypes[type] = type;
        delete newConfig.announceTypes[id];
      }
    }
    config.saveAsNewConfiguration(newConfig);
    return console.log(newConfig);
  };
  return $scope.cancel = function() {
    return $scope.newConfig = angular.copy(config);
  };
});


angular.module('directive').directive('focus', function() {
  return {
    restrict: 'A',
    scope: {
      focus: '='
    },
    link: function(scope, element, attrs) {
      return scope.$watch('focus', function() {
        if (scope.focus) {
          return element.focus();
        }
      });
    }
  };
});

angular.module('login').factory('login', function($q, $rootScope, $timeout, $http, User, db) {
  var login;
  login = {
    proxys: [],
    currentUser: {
      name: '',
      password: '',
      roles: []
    },
    getPassword: function() {
      if (this.isConnected()) {
        return this.currentUser.password;
      } else {
        return '';
      }
    },
    getName: function(name) {
      if (name == null) {
        if (this.isConnected()) {
          name = this.currentUser.name;
        } else {
          return '';
        }
      }
      name = User.getName(name);
      if (this.isConnected()) {
        this.currentUser.name = name;
      }
      return name;
    },
    getFullyQualifiedName: function(name) {
      return User.getId(name);
    },
    _lowLevelSignIn: function(username, password) {
      var userId;
      userId = User.getId(username);
      return $http.post("/_session", {
        name: userId,
        password: password
      });
    },
    signIn: function(username, password) {
      var defer;
      defer = $q.defer();
      this._lowLevelSignIn(username, password).then((function(_this) {
        return function(data) {
          data = data.data;
          data['password'] = password;
          _this.currentUser = data;
          $rootScope.$broadcast('SignIn', _this.getName());
          $rootScope.$broadcast('SessionChanged', _this.getName());
          return defer.resolve(data);
        };
      })(this), function(err) {
        return defer.reject(err);
      });
      return defer.promise;
    },
    signUp: function(user) {
      var defer, fullName, userData;
      defer = $q.defer();
      userData = {};
      userData[db.main.name] = {
        name: user.name,
        email: user.email,
        tel: user.tel,
        localization: user.localization
      };
      fullName = this.getFullyQualifiedName(user.name);
      $http.post('/_users/', {
        _id: "org.couchdb.user:" + fullName,
        name: fullName,
        type: "user",
        roles: [],
        password: user.password,
        data: userData
      }).then((function(_this) {
        return function(data) {
          return _this.signIn(user.name, user.password).then(function(data) {
            return defer.resolve(data);
          }, function(err) {
            return defer.reject(err);
          });
        };
      })(this), function(err) {
        return defer.reject(err);
      });
      return defer.promise;
    },
    signOut: function() {
      var defer;
      defer = $q.defer();
      $http["delete"]('/_session').then((function(_this) {
        return function(data) {
          data = data.data;
          _this.currentUser = {
            name: data.name,
            password: '',
            roles: data.roles
          };
          $rootScope.$broadcast('SignOut');
          $rootScope.$broadcast('SessionChanged', _this.getName());
          return defer.resolve(data);
        };
      })(this), (function(_this) {
        return function(err) {
          return defer.reject(err);
        };
      })(this));
      return defer.promise;
    },
    getInfo: function() {
      var defer;
      defer = $q.defer();
      $http.get('/_session').then((function(_this) {
        return function(data) {
          data = data.data.userCtx;
          _this.currentUser = data;
          $timeout(function() {
            $rootScope.$broadcast('SessionStart', _this.getName());
            $rootScope.$broadcast('SessionChanged', _this.getName());
            if (_this.isConnected()) {
              return $rootScope.$broadcast('SignIn', _this.getName());
            } else {
              return $rootScope.$broadcast('SignOut');
            }
          }, 100);
          return defer.resolve(data);
        };
      })(this), (function(_this) {
        return function(err) {
          return defer.reject(err);
        };
      })(this));
      return defer.promise;
    },
    isConnected: function() {
      return (this.currentUser.name != null) && this.currentUser.name !== '';
    },
    isValidated: function() {
      return this.hasRole(db.main.name);
    },
    isAppAdmin: function() {
      return this.hasRole(db.main.name + "_admin");
    },
    hasRole: function(role) {
      var piece, _i, _len, _ref;
      _ref = this.currentUser.roles || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        piece = _ref[_i];
        if (role === piece || piece === 'admin') {
          return true;
          break;
        }
      }
      return false;
    },
    isAuthorized: function(name) {
      return this.getName() === name || this.proxys.indexOf(name) > -1;
    },
    _updateUserDoc: function(username, editUserDocCallback) {
      var fqName, userDbId;
      fqName = this.getFullyQualifiedName(username);
      userDbId = "/_users/org.couchdb.user:" + fqName;
      return $http.get(userDbId).then((function(_this) {
        return function(resp) {
          return $http.put(userDbId, editUserDocCallback(resp.data));
        };
      })(this));
    },
    updateUserData: function(username, newData) {
      return this._updateUserDoc(username, (function(_this) {
        return function(userDoc) {
          var element, value;
          if (!userDoc.data[db.main.name]) {
            userDoc.data[db.main.name] = {};
          }
          for (element in newData) {
            value = newData[element];
            if (value != null) {
              userDoc.data[db.main.name][element] = value;
            }
          }
          return userDoc;
        };
      })(this));
    },
    changePwd: function(username, oldPwd, newPwd) {
      return this._lowLevelSignIn(username, oldPwd).then((function(_this) {
        return function(result) {
          return _this._updateUserDoc(username, function(userDoc) {
            userDoc.password = newPwd;
            return userDoc;
          }).then(function() {
            return _this._lowLevelSignIn(username, newPwd);
          });
        };
      })(this), (function(_this) {
        return function(err) {
          return 'CHPWD_BADOLDPWD';
        };
      })(this));
    }
  };
  $rootScope.$on('$routeChangeSuccess', function() {
    return $timeout(function() {
      $rootScope.$broadcast('SessionChanged', login.getName());
      if (login.isConnected()) {
        return $rootScope.$broadcast('SignIn', login.getName());
      } else {
        return $rootScope.$broadcast('SignOut', login.getName());
      }
    }, 200);
  });
  $rootScope.$on('SessionChanged', function($event, name) {
    var role, userNamePrefix, _i, _len, _ref, _results;
    if (name === '') {
      return login.proxys = [];
    } else {
      userNamePrefix = User.getId('');
      _ref = login.currentUser.roles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        role = _ref[_i];
        if (role.indexOf(userNamePrefix) === 0 && login.proxys.indexOf(role) === -1) {
          _results.push(login.proxys.push(User.getName(role)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  });
  return login;
});

angular.module('login').controller('SignUpCtrl', function($scope, notification, $modalInstance, login, User) {
  $scope.user = {
    name: "",
    password: "",
    passwordconf: ""
  };
  $scope.signUpSubmit = function() {
    var user;
    user = $scope.user;
    if (user.password !== user.passwordconf) {
      notification.setAlert('Les deux mots de passe sont différents !', 'danger');
      return false;
    }
    if (user.name === '' || user.password === '' || user.passwordconf === '') {
      notification.setAlert('Merci de remplir tous les champs obligatoires');
      return false;
    }
    return login.signUp(user).then((function(_this) {
      return function(data) {
        return $modalInstance.close(data);
      };
    })(this), (function(_this) {
      return function(err) {
        return notification.setAlert("Ce nom d'utilisateur est déjà pris", 'danger');
      };
    })(this));
  };
  return $scope.cancel = function() {
    return $modalInstance.dismiss('cancel');
  };
});




angular.module('selheure').controller('HomeCtrl', function(announces, transactions, $scope) {
  $scope.announces = announces;
  return $scope.transactions = transactions;
});

angular.module('selheure').controller('MainCtrl', function($scope, $rootScope, notification, login, $modal, User) {
  $rootScope.login = login;
  $scope.user = {
    name: '',
    pass: ''
  };
  login.getInfo();
  $rootScope.$on('ChangeLanguage', window.navigator.language);
  $rootScope.$on('$translateChangeError', function() {
    notification.addAlert("You're favorite language is not available!");
    return $rootScope.$on('ChangeLanguage', 'en');
  });
  $scope.signIn = function() {
    return login.signIn($scope.user.name, $scope.user.pass).then((function(_this) {
      return function(data) {
        $scope.user = {};
        if (!login.isValidated()) {
          return notification.addAlert("Votre compte n'est pas encore validé. Vous ne pourrez pas effectuer certaines actions", 'danger');
        }
      };
    })(this), (function(_this) {
      return function(err) {
        console.log(err);
        return notification.addAlert('Mauvais Utilisateur/Mot de passe', 'danger');
      };
    })(this));
  };
  $scope.signUp = function() {
    return $modal.open({
      templateUrl: 'partials/signup.html',
      controller: 'SignUpCtrl'
    });
  };
  return $scope.signOut = function() {
    return login.signOut();
  };
});










angular.module('notification').factory('Notif', function(CouchDB, db) {
  return CouchDB(db.main.url, db.main.appName, 'notification');
});

angular.module('notification').factory('notification', function($filter, $interval) {
  var notification;
  notification = {
    alerts: [],
    displayTimeLong: 15000,
    displayTimeShort: 5000,
    maxAlert: 2,
    setDisplayTimeLong: function(max) {
      return this.maxAlert = max;
    },
    setDisplayTimeLong: function(time) {
      return this.displayTimeLong = time * 1000;
    },
    setDisplayTimeShort: function(time) {
      return this.displayTimeShort = time * 1000;
    },
    setAlert: function(message, type, display) {
      if (display == null) {
        display = 'short';
      }
      this.alerts = [];
      return this.addAlert(message, type, display);
    },
    addAlert: function(message, type, display) {
      var add, alert, i, _i, _len, _ref;
      if (display == null) {
        display = 'short';
      }
      add = {
        message: $filter('translate')(message),
        type: type,
        time: new Date().getTime(),
        display: display
      };
      if (this.alerts.length === this.maxAlert) {
        this.alerts.pop();
      }
      _ref = this.alerts;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        alert = _ref[i];
        if (alert.message === add.message) {
          this.alerts.splice(i, 1);
          break;
        }
      }
      return this.alerts.unshift(add);
    },
    closeAlert: function(index) {
      return this.alerts.splice(index, 1);
    }
  };
  $interval(function() {
    var alert, i, timespend, _i, _len, _ref, _results;
    _ref = notification.alerts;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      alert = _ref[i];
      timespend = new Date().getTime() - alert.time;
      if (timespend >= (alert.display === 'short' ? notification.displayTimeShort : notification.displayTimeLong)) {
        _results.push(notification.closeAlert(i));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }, 500);
  return notification;
});

angular.module('notification').directive('notificationOverlay', function(notification) {
  return {
    restrict: 'E',
    template: '<div ng-repeat="notif in notifs.alerts" class="notif-overlay alert alert-{{ notif.type || \'warning\' }}">' + '<button class="close" ng-click="close($index)">&times;</button>' + '{{ notif.message }}' + '</div>',
    link: function(scope, element, attrs) {
      element.css({
        "position": "fixed",
        "top": "60px",
        "right": "40px",
        "zIndex": "99999999999",
        "width": "300px"
      });
      scope.notifs = notification;
      return scope.close = function($index) {
        return notification.closeAlert($index);
      };
    }
  };
});





angular.module('transaction').controller('DeclareCtrl', function($scope, $state, config, login, userList, Announce, Transaction, User, notification) {
  var demandList, proposalList, transaction, updateUserList;
  $scope.transaction = {};
  $scope.userList = [];
  demandList = [];
  proposalList = [];
  $scope.announceList = [];
  $scope.currencyName = config.get('currency');
  if ($state.$current.locals.globals.participation != null) {
    console.log("participation");
    $scope.transaction.from = config.get('collectiveUser');
    $scope.transaction.to = login.getName();
  }
  if ($state.$current.locals.globals.transaction) {
    transaction = $state.$current.locals.globals.transaction;
    $scope.transaction = transaction;
    transaction.reason = {
      text: transaction.message,
      announce: transaction.reference
    };
    delete transaction.message;
    delete transaction.reference;
    if (transaction.to !== login.getName() && login.proxys.indexOf(transaction.to) === -1) {
      transaction.toField = transaction.to;
      transaction.to = 'another';
    }
    if (transaction.from !== login.getName() && login.proxys.indexOf(transaction.from) === -1) {
      transaction.fromField = transaction.from;
      transaction.from = 'another';
    }
  }
  $scope.newTransactionSubmit = function() {
    transaction = angular.copy($scope.transaction);
    if (transaction.from === 'another') {
      transaction.from = transaction.fromField;
      if (login.proxys.length === 0) {
        transaction.to = login.getName();
      }
    }
    if (transaction.to === 'another') {
      transaction.to = transaction.toField;
    }
    delete transaction.toField;
    delete transaction.fromField;
    console.log(transaction);
    if ((transaction.amount == null) || !transaction.from || !transaction.to) {
      notification.addAlert('Veuillez remplir les champs obligatoires', 'danger');
      return false;
    }
    transaction.update = 'create';
    transaction.to = User.getId(transaction.to);
    transaction.from = User.getId(transaction.from);
    return Transaction.update(transaction).then(function(data) {
      return $state.go('home');
    }, function(err) {
      return console.log(err);
    });
  };
  $scope.$watch('transaction.from', function(value) {
    if (value !== login.getName() && $scope.transaction.to !== login.getName()) {
      return $scope.transaction.to = '';
    }
  });
  $scope.$watchCollection('[transaction.fromField, transaction.from]', function(value) {
    var search;
    if (value[1] === 'another') {
      search = value[0];
    } else {
      search = value[1];
    }
    if (search == null) {
      return;
    }
    return Announce.view({
      view: 'by_author',
      key: search,
      include_docs: true
    }).then(function(data) {
      var announce, _i, _len;
      console.log(data);
      demandList = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        announce = data[_i];
        if (announce.announce_type === 'demand') {
          demandList.push(announce);
        }
      }
      return $scope.announceList = proposalList.concat(demandList);
    }, function(err) {
      return console.log(err);
    });
  });
  $scope.$watchCollection('[transaction.toField, transaction.to]', function(value) {
    var search;
    if (value[1] === 'another') {
      search = value[0];
    } else {
      search = value[1];
    }
    if (search == null) {
      return;
    }
    return Announce.view({
      view: 'by_author',
      key: search,
      include_docs: true
    }).then(function(data) {
      var announce, _i, _len;
      console.log(data);
      proposalList = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        announce = data[_i];
        if (announce.announce_type === 'proposal') {
          proposalList.push(announce);
        }
      }
      return $scope.announceList = demandList.concat(proposalList);
    }, function(err) {
      return console.log(err);
    });
  });
  updateUserList = function() {
    var username, _i, _len, _results;
    $scope.userList = [];
    _results = [];
    for (_i = 0, _len = userList.length; _i < _len; _i++) {
      username = userList[_i];
      if (username !== login.getName()) {
        _results.push($scope.userList.push(username));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };
  updateUserList();
  return $scope.$on('SessionChanged', updateUserList);
});

angular.module('transaction').factory('Transaction', function(CouchDB, db, User) {
  var Transaction, userFields;
  userFields = ['to', 'from', 'declaredBy', 'editableBy', 'validatedBy', 'validatableBy'];
  Transaction = CouchDB(db.main.url, db.main.appName, 'transaction');
  Transaction.all_then = function(transactions) {
    var field, id, transaction, _i, _len;
    for (id in transactions) {
      transaction = transactions[id];
      for (_i = 0, _len = userFields.length; _i < _len; _i++) {
        field = userFields[_i];
        transaction[field] = User.getName(transaction[field]);
      }
    }
    return transactions;
  };
  Transaction.get_then = function(transaction) {
    var field, _i, _len;
    for (_i = 0, _len = userFields.length; _i < _len; _i++) {
      field = userFields[_i];
      transaction[field] = User.getName(transaction[field]);
    }
    return transaction;
  };
  Transaction.view_then = function(transactions) {
    var field, id, transaction, _i, _len;
    for (id in transactions) {
      transaction = transactions[id];
      for (_i = 0, _len = userFields.length; _i < _len; _i++) {
        field = userFields[_i];
        transaction[field] = User.getName(transaction[field]);
      }
    }
    return transactions;
  };
  return Transaction;
});

angular.module('transaction').directive('transactions', function(login, $state, Transaction, notification) {
  return {
    restrict: 'E',
    scope: {
      transactions: '='
    },
    templateUrl: 'partials/Transactions/table.html',
    link: function(scope, element, attrs) {
      var t, _i, _len, _ref;
      _ref = scope.transactions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        if (t.declaredBy !== t.editableBy) {
          if (t.editableBy === t.from) {
            t.fromUser = t.declaredBy;
          } else if (t.editableBy === t.to) {
            t.toUser = t.declaredBy;
          }
        } else if (t.validated && t.validatedBy !== t.validatableBy) {
          if (t.validatableBy === t.from) {
            t.fromUser = t.validatedBy;
          } else if (t.validatableBy === t.to) {
            t.toUser = t.validatedBy;
          }
        }
      }
      scope.edit = function(transaction) {
        return $state.go('transactionedit', transaction);
      };
      scope.canValidate = function(transaction) {
        if (transaction == null) {
          return false;
        }
        return login.isAuthorized(transaction.validatableBy) && !scope.canEdit(transaction);
      };
      scope.canEdit = function(transaction) {
        if (transaction == null) {
          return false;
        }
        return login.isAuthorized(transaction.editableBy);
      };
      return scope.validate = function(transaction) {
        return Transaction.update({
          update: 'validate',
          id: transaction.id
        }).then(function(data) {
          notification.addAlert('Votre validation a été prise en compte', 'success');
          return transaction.validated = true;
        }, function(err) {
          notification.addAlert('La validation a échoué !', 'danger');
          return console.log(err);
        });
      };
    }
  };
});




angular.module('translation').directive('editField', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
      type: '@',
      lang: '=',
      save: '&',
      rev: '='
    },
    template: "<span ng-hide=\"edit\" ng-click=\"edit=true\" type=\"text\">{{ ngModel }}</span>\n\n<input ng-show=\"type=='input' && edit\" type=\"text\" ng-model=\"value\" style=\"width:80%\" ng-disabled=\"loading\" ng-keypress=\"keypress($event)\" focus=\"edit\" ng-blur=\"blur()\"/>\n\n<textarea ng-show=\"type=='textarea' && edit\" ng-model=\"value\" ng-disabled=\"loading\" ng-blur=\"blur()\" ng-keypress=\"keypress($event)\" focus=\"edit\" ></textarea>\n\n<span ng-show=\"loading\" us-spinner=\"{width:2,length:6,radius:5}\"></span>\n\n<span ng-show=\"edit && !loading\">\n  <button ng-click=\"goSave()\" class=\"btn btn-default glyphicon glyphicon-ok\"     style=\"color:green;\"></button>\n  <button ng-click=\"cancel()\" class=\"btn btn-default glyphicon glyphicon-remove\" style=\"color:red;  \"></button>'\n</span>",
    link: function(scope, element, attrs) {
      scope.change = false;
      scope.edit = false;
      scope._rev = null;
      scope.$on('EditFieldTranslationOn', function() {
        scope.translation = true;
        return scope.ngModel = '';
      });
      scope.$watch('lang', function() {
        scope.value = angular.copy(scope.ngModel);
        return scope.translation = false;
      });
      scope.$watch('edit', function(value) {
        if (value) {
          return scope._rev = scope.rev;
        } else {
          return scope._rev = null;
        }
      });
      scope.blur = function() {
        return $timeout(function() {
          return scope.edit = false;
        }, 300);
      };
      scope.keypress = function($event) {
        if ($event.keyCode === 13 && scope.type === 'input') {
          return scope.goSave();
        } else if ($event.keyCode === 13 && $event.ctrlKey) {
          return scope.goSave();
        } else if ($event.keyCode === 10 && $event.ctrlKey) {
          return scope.goSave();
        } else if ($event.keyCode === 27) {
          return scope.edit = false;
        } else {
          return scope.change = true;
        }
      };
      scope.goSave = function() {
        if (scope.change === false) {
          return scope.cancel();
        }
        scope.loading = true;
        return scope.save({
          value: scope.value,
          rev: scope._rev
        }).then(function(data) {
          scope.loading = false;
          scope.translation = false;
          scope.edit = false;
          return scope.ngModel = angular.copy(scope.value);
        }, function(err) {
          return scope.loading = false;
        });
      };
      return scope.cancel = function() {
        scope.value = scope.ngModel;
        scope.edit = false;
        return scope.change = false;
      };
    }
  };
});

angular.module('translation').directive('langBar', function($rootScope) {
  return {
    restrict: 'E',
    scope: {
      langs: '=',
      allLangs: '=',
      lang: '=',
      nbCard: '='
    },
    template: "<div class=\"btn-group\">\n  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"translateMode\">\n    <img src=\"img/country-flags-png/{{lang}}.png\"/>\n    <span class=\"caret\"></span>\n  </button>\n  <ul class=\"dropdown-menu\">\n    <li ng-repeat=\"(key, value) in langs\">\n      <a ng-click=\"changeLangue(key)\"><img src=\"img/country-flags-png/{{key}}.png\"/> ({{ (value / nbCard * 100).toFixed(2) }} %)</a>\n    </li>\n  </ul>\n</div>\n<div class=\"btn-group\" ng-hide=\"translateMode\">\n  <button ng-disabled=\"disable\" type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n    Help Translate\n  </button>\n  <ul class=\"dropdown-menu\">\n    <li ng-repeat=\"(key, value) in allLangs\">\n      <a ng-click=\"addLangue(key)\"><img src=\"img/country-flags-png/{{key}}.png\"/>{{value}}</a>\n    </li>\n  </ul>\n</div>\n<button ng-show=\"translateMode\" ng-click=\"stopTranslate()\" ng-disabled=\"disable\" class=\"btn btn-default\">\n  Stop Translate\n</button>",
    link: function(scope, element, attrs) {
      scope.translateMode = false;
      $rootScope.$on('SignIn', function() {
        return scope.disable = false;
      });
      $rootScope.$on('SignOut', function() {
        return scope.disable = true;
      });
      scope.changeLangue = function(key) {
        scope.lang = key;
        $rootScope.$broadcast('LangBarChangeLanguage', key);
        return scope.stopTranslate();
      };
      scope.addLangue = function(key) {
        var _ref;
        $rootScope.$broadcast('LangBarChangeLanguage', key);
        scope.translateMode = true;
        scope.lang = key;
        scope.langs[key] = (_ref = scope.langs[key]) != null ? _ref : 0;
        return $rootScope.$broadcast('LangBarNewLanguage', key);
      };
      return scope.stopTranslate = function() {
        scope.translateMode = false;
        return $rootScope.$broadcast('LangBarStopTranslate');
      };
    }
  };
});

angular.module('translation').factory('Local', function(CouchDB, db) {
  return CouchDB(db.url, db.name, 'local');
});

angular.module('translation').directive('translation', function($compile, $rootScope, $filter) {
  return {
    restrict: 'E',
    scope: {
      field: '@',
      object: '=',
      save: '&'
    },
    transclude: true,
    template: "<span ng-hide=\"edit\" class=\"text\" ng-transclude></span>\n<span ng-show=\"edit\" class=\"input\">\n  <input type=\"text\" ng-model=\"textTranslated\" ng-keypress=\"key($event, textTranslated)\" popover=\"{{ text }}\" popover-placement=\"bottom\" popover-trigger=\"mouseenter\"/>\n  <button ng-click=\"edit=false\">&gt;&gt;</button>\n</span>",
    link: function(scope, element, attrs) {
      var _ref;
      scope.translation = false;
      scope.edit = false;
      scope.lang = (_ref = scope.object) != null ? _ref.lang : void 0;
      $rootScope.$on('LangBarNewLanguage', function($event, lang) {
        scope.translation = true;
        return scope.translationLang = lang;
      });
      $rootScope.$on('LangBarStopTranslate', function() {
        return scope.translation = false;
      });
      element.on('mouseenter', function() {
        if (scope.translation) {
          scope.textTranslated = (scope.lang === scope.translationLang ? scope.text : '');
          return scope.edit = true;
        }
      });
      element.on('mouseleave', function() {
        return scope.edit = false;
      });
      if (scope.object != null) {
        scope.expr = element.find('.text').text().trim().slice(2, -2);
        $rootScope.$on('ChangeLanguageSuccess', function() {
          return scope.text = scope.$parent.$eval(scope.expr);
        });
      } else {
        scope.expr = element.find('.text').text().trim();
        $rootScope.$on('$translateChangeSuccess', function($event, language) {
          scope.lang = language;
          return scope.text = $filter('translate')(scope.expr);
        });
      }
      return scope.key = function($event, content) {
        var _ref1, _ref2;
        if ($event.keyCode === 13) {
          scope.edit = false;
          return scope.save({
            text: content,
            field: scope.field,
            key: scope.expr,
            id: (_ref1 = scope.object) != null ? _ref1.id : void 0,
            lang: scope.translationLang,
            from: (_ref2 = scope.object) != null ? _ref2.lang : void 0
          });
        }
      };
    }
  };
});





angular.module('url').directive('goto', function(url) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var i, name, param, params, piece, realName, route, _i, _j, _len, _len1, _ref;
      route = url.getRouteByName(attrs.goto);
      params = {};
      _ref = url.getRouteParams(route);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        realName = url.getParamName(param);
        name = realName.split('_');
        for (i = _j = 0, _len1 = name.length; _j < _len1; i = ++_j) {
          piece = name[i];
          if (i !== 0) {
            name[i] = piece.substring(0, 1).toUpperCase() + piece.substring(1);
          }
        }
        name = name.join('');
        if (attrs[name] !== void 0) {
          params[realName] = attrs[name];
        }
      }
      return element.attr('href', url.get(attrs.goto, params));
    }
  };
});

ng.factory('url', function($location, $route) {
  return {
    prefix: function() {
      if ($location.$$html5) {
        return '';
      } else {
        return '#';
      }
    },
    redirect: function(name, params) {
      var route;
      if (params == null) {
        params = {};
      }
      route = this.getRouteByName(name);
      route = this.inject(params, route);
      route = route.replace('%23', '#');
      return $location.path(route);
    },
    get: function(name, params) {
      var route;
      if (params == null) {
        params = {};
      }
      route = this.getRouteByName(name);
      return this.prefix() + this.inject(params, route);
    },
    getRouteByName: function(name) {
      var key, route, _ref;
      _ref = $route.routes;
      for (key in _ref) {
        route = _ref[key];
        if (route.hasOwnProperty('name') && route.name === name) {
          return route.originalPath;
        }
      }
      return '';
    },
    inject: function(params, route) {
      var name, param, url, _i, _len, _ref;
      if (route === "") {
        return "";
      }
      url = route;
      _ref = this.getRouteParams(route);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        name = this.getParamName(param);
        if (!params.hasOwnProperty(name) && !this.isOptional(param)) {
          throw "Impossible to generate the url because one/some params are missing:  " + name;
          return '';
        }
        if (params[name] !== void 0) {
          url = url.replace(param, params[name].replace('#', '%23'));
        } else {
          url = url.replace(param, '');
        }
      }
      if (url[url.length - 1] === "/") {
        url = url.substr(0, url.length - 1);
      }
      return url;
    },
    getRouteParams: function(route) {
      var result;
      result = route.match(/\:[\w-?]*/g);
      if (result === null) {
        result = [];
      }
      return result;
    },
    getParamName: function(param) {
      if (this.isOptional(param)) {
        return param.substr(1, param.length - 2);
      } else {
        return param.substr(1);
      }
    },
    isOptional: function(param) {
      return param[param.length - 1] === '?';
    }
  };
});

angular.module('user').factory('User', function(CouchDB, db) {
  var User;
  User = CouchDB(db["private"].url, db["private"].appName, 'user');
  User.getName = function(name) {
    if (!name) {
      return '';
    }
    if (name.indexOf(db.main.name + '.') === 0) {
      name = name.slice(db.main.name.length + 1);
    }
    return name;
  };
  User.getId = function(name) {
    return db.main.name + '.' + name;
  };
  return User;
});

angular.module('user').controller('UserListCtrl', function($scope, $modal, $state, notification, User, login, users) {
  $scope.users = users;
  $scope.lockUser = function(user) {
    return User.update({
      update: 'lock',
      id: user.name
    }).then(function(data) {
      return user.locked = true;
    }, function(err) {
      notification.addAlert('Le verrouillage a échoué ! (Log : ' + err.reason + ')', 'danger');
      return console.log(err);
    });
  };
  $scope.unlockUser = function(user) {
    return User.update({
      update: 'unlock',
      id: user.name
    }).then(function(data) {
      return user.locked = false;
    }, function(err) {
      return notification.addAlert('Le déverrouillage a échoué ! (Log : ' + err.reason + ')', 'danger');
    });
  };
  return $scope.resetPwd = function(user) {
    return User.update({
      update: 'resetPwd',
      id: user.name
    }).then(function(data) {
      return notification.addAlert('Mot de passe réinitialisé à "motdepasse"', 'info');
    }, function(err) {
      return notification.addAlert('Impossible de réinitialiser le mot de passe ! (Log : ' + err.reason + ')', 'danger');
    });
  };
});

angular.module('user').controller('UserPageCtrl', function($scope, config, login, notification, transactions, announces, balance, notValidated, user) {
  var _ref, _ref1;
  $scope.user = user;
  $scope.transactions = transactions;
  $scope.notValidated = notValidated;
  $scope.announces = announces;
  $scope.userBalance = (_ref = (_ref1 = balance[0]) != null ? _ref1.sum : void 0) != null ? _ref : 0;
  $scope.currencyName = config.get('currency');
  $scope.newUserData = {
    tel: $scope.user.tel,
    email: $scope.user.email,
    localization: $scope.user.localization
  };
  $scope.editDataSubmit = function(newData) {
    if (!login.isConnected()) {
      notification.addAlert("Vous devez être connecté(e) pour pouvoir modifier vos données personnelles");
      return;
    }
    if (user.name !== login.getName()) {
      notification.addAlert("Vous ne pouvez modifier que vos propres données personnelles");
      return;
    }
    return login.updateUserData(user.name, newData).then((function(_this) {
      return function(result) {
        var element, value;
        console.log(result);
        for (element in newData) {
          value = newData[element];
          if (value != null) {
            $scope.user[element] = value;
          }
        }
        return $scope.editMode = false;
      };
    })(this), function(err) {
      return console.error(err);
    });
  };
  return $scope.changePwdSubmit = function(pwd) {
    if (!login.isConnected()) {
      notification.addAlert("Vous devez être connecté(e) pour pouvoir changer votre mot de passe");
      return false;
    }
    if (user.name !== login.getName()) {
      notification.addAlert("Vous ne pouvez modifier que votre propre mot de passe");
      return false;
    }
    if (pwd["new"] !== pwd.confirm) {
      notification.setAlert('Le mot de passe et la confirmation doivent être identiques', 'danger');
      return false;
    }
    if (pwd.old === '' || pwd["new"] === '' || pwd.confirm === '') {
      notification.setAlert('Merci de remplir tous les champs obligatoires');
      return false;
    }
    return login.changePwd(user.name, pwd.old, pwd["new"]).then((function(_this) {
      return function(result) {
        console.log(result);
        $scope.changePwdMode = false;
        return notification.setAlert("Mot de passe modifié", "success");
      };
    })(this), (function(_this) {
      return function(err) {
        if (err === 'CHPWD_BADOLDPWD') {
          return notification.setAlert("Mot de passe actuel incorrect");
        } else {
          return notification.setAlert("Erreur inconnue (log: " + err + ")");
        }
      };
    })(this));
  };
});

angular.module('selheure').factory('DbSelect', function($location) {
  return {
    _baseName: '',
    getMainDb: function(app) {
      var name;
      if ($location.absUrl().indexOf('_rewrite') >= 0) {
        name = $location.absUrl().split('/')[3];
      } else {
        name = app + '-' + $location.host().split('.')[0];
      }
      if (name.slice(-5) === '_main') {
        this._baseName = name.slice(0, -5);
      } else {
        this._baseName = name;
      }
      return {
        name: name,
        url: '/' + name
      };
    },
    getDb: function(dbName) {
      if (this._baseName === '') {
        this.getMainDb();
      }
      return {
        name: this._baseName + '_' + dbName,
        url: this._baseName + '_' + dbName
      };
    },
    setDbConfig: function(applicationName, db, dbs) {
      var dbName, splitted, _i, _len;
      db.main = this.getMainDb(applicationName);
      splitted = db.main.name.split('-');
      db.main.instance = splitted.pop();
      db.main.appName = applicationName + "-main";
      for (_i = 0, _len = dbs.length; _i < _len; _i++) {
        dbName = dbs[_i];
        db[dbName] = this.getDb(dbName);
        db[dbName].appName = applicationName + '-' + dbName;
      }
      return db;
    }
  };
});
