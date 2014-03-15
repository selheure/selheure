function MainCtrl($scope, url, config){
	$scope.loginSubmit = function() {
		console.log("login attempt");
		if($scope.username && $scope.password){
		}
	};

	$scope.signup = function() {
		$('#signUpModal').modal();
	}

	$scope.signUpSubmit = function() {
		$('#signUpModal').modal('hide');
		//var newUser = {name: $scope.user.id};
		var userDoc = angular.copy($scope.user);
		console.log("userDoc", userDoc)
	}
}
