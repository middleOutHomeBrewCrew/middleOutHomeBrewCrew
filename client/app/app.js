var app = angular.module("MainApp", ['ngRoute']);
// Youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

app.controller("MainController", function($scope, $sce){
  $scope.message = "Hello World";

  $scope.urlSubmitter = function(){
    var url = $scope.url;
    url = url.slice(32);
    $scope.url = url;
    $scope.player = new YT.Player('player', {
      videoId: $scope.url
    });
  }

  $scope.createUrl = function(url){
    return url ? $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + url + '?autoplay=1') : '';
  }

  $scope.playVideo = function() {
    $scope.player.playVideo();
  }

  $scope.pauseVideo = function() {
    $scope.player.pauseVideo();
  }
});

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '../views/chat.html',
    controller: 'MainController'
  })
})
