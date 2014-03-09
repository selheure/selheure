function MainCtrl($scope, url, login, uiLang, config, notification){
	$scope.content = {
		projectName: config.projectName,
		collectifName: config.collectifName
	};
	uiLang.getTranslations('header').then(function(result){
		angular.extend($scope.content, result);
	});
	//
	$scope.pageReady = config;

	$scope.couch = $.couch;

	$scope.url = url;
	$scope.alert = notification;

	$scope.loginSubmit = function() {
		console.log("login attempt");
		if($scope.username && $scope.password){
			login.login($scope.username, $scope.password).then(function(result){
				delete $scope.password;
				delete $scope.username;
			}, function(error){
				delete $scope.password;
				delete $scope.username;
			});
		}
	};

	login.getUserSession();
	$scope.login = login;

	function getConfig() {
		$scope.couch.db(config.db).openDoc("selheure-config", {
			success: function(doc) {
				//console.log(doc);
				$scope.categories = doc.categories;
				$scope.subCategories = doc.sub_categories;
				$scope.announce_types = doc.types;
				$scope.$apply();
			}
		});
	}
	getConfig();

	$scope.patternTel = /\d\d \d\d \d\d \d\d \d\d/;
	$scope.signup = function() {
		$('#signUpModal').modal();
	}

	$scope.signUpSubmit = function() {
		$('#signUpModal').modal('hide');
		//var newUser = {name: $scope.user.id};
		var userDoc = angular.copy($scope.user);
		console.log("userDoc", userDoc)
		login.signup(userDoc).then(function(result) {
			delete $scope.user;
		});
	}
}
