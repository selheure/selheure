angular.module('user').
factory('login', function(db, config, notification) {
  return  {
    user: {},
    login: function(username, password) {
      var _this = this;
      return db.login(username, password).
      then(function(user) {
        console.log(user);
        return _this.getUserData(user.name, user.roles).then(function(data){
          if(data !== null) {
            return _this.user = data;
          } else {
            notification.error("Identifiant ou mot de passe incorrect");
            return _this.logout();
          }
        });
      }, function(error) {
          console.log(error);
          return error;
      });
    },
    logout: function() {
      var _this = this;
      db.logout().
      then(function(result) {
        console.log("logged out", result);
        return _this.user = {};
      });
    },
    isLoggedIn: function() {
      return this.user.hasOwnProperty('id');
    },
    loginRequiredNotification: function() {
      notification.warn('Vous devez être connecté pour réaliser cette action');
    },
    loginRequired: function() {
      if(!this.isLoggedIn()) {
        this.loginRequiredNotification();
        return false;
      }
      return true;
    },
    hasRole: function(role) {
      return this.user.hasOwnProperty('roles') && role in this.user.roles;
    },
    isAuthorized: function(username) {
      return this.isLoggedIn() && (this.user.id == username || this.hasRole(username));
    },
    unAuthorizedNotification: function(username) {
      notification.warn("Vous n'êtes pas autorisé à réaliser cette action");
    },
    authorizationRequired: function(username) {
      if(!this.isAuthorized(username)) {
        unAuthorizedNotification(username);
        return false;
      }
      return true;
    },
    getUserSession: function() {
      var _this = this;
      return db.session().then(function(result) {
        console.log(result);
        if(result.userCtx.name !== null) {
          _this.getUserData(result.userCtx.name, result.userCtx.roles).then(function(data){
            if(data != null)
              return _this.user = data;
            else
              return _this.logout();
          });
        }
      });
    },
    getUserData: function(name, roles) {
      //var _this = this;
      return db.getFirstFromView("selheure", "user_list", ['key', name], false).then(function(userData){
        console.log("userData", name, userData)
        if(userData) {
          userData.roles = {};
          for(var e in roles)
            userData.roles[roles[e]] = null;
          console.log("roles", roles);
          console.log("proxies");
          angular.forEach(userData.proxyFor, function(user, key){
            console.log(user);
            if(!userData.roles.hasOwnProperty(user))
              delete userData.proxyFor[key];
          });
          /*for(var (key, user) in userData.proxyFor) {
            console.log(user)
            if(!userData.roles.hasOwnProperty(user))
              delete userData.proxyFor[user];
          }*/
        }
        console.log("userData", userData);
        return userData;
      })
      /*db.getView("selheure", "user_list", ['key', name], false).
      then(function(result) {
        if(loginProcess){
          if(result.data.length)
            _this.user = result.data[0];
          else
            _this.logout();
        } else
          return result.data[0];
      });*/
    },
    signup: function(userDoc) {
      var _this = this;
      return db.signup(userDoc.id, userDoc.password).then(function(result) {
        var pwd = userDoc.password;
        delete userDoc.password;
        db.update('selheure/user', userDoc).then(function(data) {
          _this.login(userDoc.id, pwd);
          notification.success("Votre compte a été enregistré avec succès !");
        }, function(error) {
          notification.error("Erreur dans la création de votre compte (" + error[0]  + ": " + error[1] + ")");
        });
      }, function(error) {
        if(error[0] == '409') {
          notification.error("Cet identifiant existe déjà !");
        } else {
          notification.error("Erreur dans la création de votre compte (" + error[0]  + ": " + error[1] + ")");
        }
      });
    },
  }
});
