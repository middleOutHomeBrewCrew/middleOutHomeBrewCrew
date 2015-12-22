var app = angular.module("MainApp", ['ngRoute']);

app.controller("MainController", function($scope, $sce){
  $scope.message = "Hello World";

   $scope.urlSubmitter = function(){
	    var url = $scope.url;
	    url = url.slice(32);
	    $scope.url = url;
    }
    $scope.createUrl = function(url){
    return url ? $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + url) : '';
   }
});

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: '../views/chat.html',
		controller: 'MainController'
	})
})