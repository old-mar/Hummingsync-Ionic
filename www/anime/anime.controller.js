angular.module('starter')
.controller('AnimeCtrl', function($scope, ionicMaterialInk, Animes) {
  ionicMaterialInk.displayEffect();

  $scope.animelist = Animes.all();
});