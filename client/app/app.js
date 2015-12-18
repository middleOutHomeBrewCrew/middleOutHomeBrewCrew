var app = angular.module("MainApp", ['ngRoute']);

app.controller("MainController", function($scope){
  $scope.message = "Hello World";
});

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '../views/chat.html',
		controller: 'MainController'
	})
})