angular.module('starter')
.controller('AnimeCtrl', function($scope, $state, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();

  DbService.getAll().then(function(res) {
  	$scope.animelist = res;
  });

  $scope.openSelectedAnime = function(animeId) {
  		Animes.selectedAnimeId = animeId;
  		console.log(animeId);
  		$state.go('animeinfo');
  }
});
// .controller('AnimeInfoCtrl', function($scope) {

// });