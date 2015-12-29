var app = angular.module("MainApp", ['ngRoute']);
// Youtube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

app.controller("MainController", function($scope, $sce){

  $scope.playVideo = function() {
    $scope.player.playVideo();
  }

  $scope.pauseVideo = function() {
    $scope.player.pauseVideo();
  }
  
});


