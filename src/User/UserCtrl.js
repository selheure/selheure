ng.controller('UserPageCtrl', function($scope, $routeParams, url, config, db, login, notification, uiLang, PopupService){
  var user_name = $routeParams['user_name'];
  $scope.url = url;
  $scope.content = {};
  uiLang.getTranslations('announces').then(function(result){
    angular.extend($scope.content, result);
  });
  uiLang.getTranslations('userpage').then(function(result){
    angular.extend($scope.content, result);
  });
  console.log($scope.content)
  $scope.announceTypes = config.announceTypes;
  $scope.close = PopupService.close;

  $scope.editAnnounceSubmit = function() {
    if(login.loginRequired()) {
      var doc = angular.copy($scope.announce);
      //$('#editModal').modal('hide');
      $scope.couch.db('selheure').saveDoc(doc, {
        success: function(data) {
          notification.success("Modification sauvegardée avec succès !");
          angular.copy($scope.announce, $scope.announceToEdit);
          $scope.announce = {};
          $scope.announceToEdit = {};
          $scope.$apply();
        },
        error: function(status, error) {
          console.error(status, error);
        }
      });
    }
  }

  $scope.deleteAnnounce = function(key) {
    if(login.loginRequired()) {
      $scope.announceKeyToDelete = key;
      PopupService.close();
      $scope.couch.db('selheure').removeDoc($scope.user_announces[key], {
        success: function(data) {
          notification.success("Annonce supprimée avec succès !");
          $scope.user_announces.splice(key, 1);
          $scope.$apply();
        },
        error: function(status, error) {
          console.error(status, error);
        }
      });
    } else {
      PopupService.close();
      PopupService.alert('Vous n\'êtes pas connecté(e)', 'Vous devez vous connecter pour effectuer cette action', 'Ok', 'close()');
    }
  }

  $scope.validateTransaction = function(transaction) {
    console.log("validate trans", transaction);
    if(login.loginRequired()) {
      PopupService.close();
      db.update('selheure/validate', {_id: transaction._id}).
      then(function(result) {
        transaction.validated = true;
        notification.success("Echange validé avec succès !");
      }, function(error) {
        console.error(error);
        if(error[0] == 403)
          login.unAuthorizedNotification();
        else if(error[0] == 401)
          login.loginRequiredNotification();
      });
    } else {
      PopupService.close();
      PopupService.alert('Vous n\'êtes pas connecté(e)', 'Vous devez vous connecter pour effectuer cette action', 'Ok', 'close()');
    }
  }
  $scope.editAnnounce = function(announce) {
    if(login.loginRequired()) {
      $scope.announceToEdit = announce;
      $scope.announce = angular.copy(announce);
      console.log("edit", $scope.announce);
      $('#editModal').modal();
    }
  }

  function getUserBalance(user_name) {
    return db.getView('selheure', 'balances', ['key', user_name]);
  }
  function loadPage(user_name) {
    console.log("load user page");
    db.getView('selheure', 'AnnouncesByUserDate', ['key', user_name], false, {
      startkey: user_name,
      endkey: [user_name, {}],
    }).
    then(function(result) {
      if(result.length) {
        $scope.user_announces = result;
      }
    });
    /*db.getView('selheure', 'transaction_list', ['key', user_name], false).
    then(function(result) {
      if(result.length) {
        $scope.transactionList = result;
      }
    });*/
    getUserBalance(user_name).then(function (result) {
      $scope.balance = {value: 0, unity: 'minutes'};
      if(result.length) {
        $scope.balance.value = result[0];
      }
      //$scope.$apply();
    });
  }
  console.log(user_name, $scope.login.user.id);
  //console.log($scope.login);
  /*if(user_name == $scope.login.user.id) {
    $scope.user = $scope.login.user;
    loadPage(user_name);
  } else {*/
  db.getView('selheure', 'user_list', ['key', user_name], false).
  then(function(result) {
    if(result.length) {
      $scope.user = result[0];
      loadPage(user_name);
    }
  });
  /*}*/
  $scope.$watch('transactionTable', function(newVal, oldVal) {
    if(newVal) {
      $http.get('partials/transaction_table.html').success(function (data) {
        $('#transaction-table').html($compile(data)($scope));
      });
    }
  });
});
