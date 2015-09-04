angular.module('starter')
.controller('AnimeInfoCtrl', function($scope, $state, $stateParams, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  
  $stateParams.animeId == undefined;
  ionicMaterialInk.displayEffect();
  $scope.anime = DbService.get($stateParams.animeId);
  console.log($stateParams.animeId);
});