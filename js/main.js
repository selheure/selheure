angular.module('letsco', []).config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/what', {templateUrl: 'partials/what.html', controller: WhatCtrl}).
		when('/how', {templateUrl: 'partials/what.html', controller: HowCtrl}).
		when('/why', {templateUrl: 'partials/what.html', controller: WhyCtrl}).
		when('/who', {templateUrl: 'partials/who.html', controller: WhoCtrl}).
		when('/where', {templateUrl: 'partials/where.html', controller: WhereCtrl}).
		otherwise({redirectTo: '/'});
}]);


/*function Cntl($scope) {
    $scope.updateBudgets = function(b, b_total) {
        $scope.budget_finance;
    }
	
	.directive('contenteditable', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            // view -> model
            elm.bind('keydown', function() {
                scope.$apply(function() {
                    ctrl.$setViewValue(elm.html());
                });
            });
            // model -> view
            ctrl.$render = function(value) {
                elm.html(value);
            };
            // load init value from DOM
            ctrl.$setViewValue(elm.html());
        }
    };
})
*/
