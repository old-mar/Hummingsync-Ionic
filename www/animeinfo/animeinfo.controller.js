angular.module('starter')
.controller('AnimeInfoCtrl', function($scope, $state, $stateParams, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  
  ionicMaterialInk.displayEffect();
  $scope.anime = DbService.get($stateParams.animeId);

});