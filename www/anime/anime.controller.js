angular.module('starter')
.controller('AnimeCtrl', function($scope, $timeout, ionicMaterialInk, Animes, DbService) {
  ionicMaterialInk.displayEffect();

  $scope.animelist = Animes.animelist;

  $scope.openSelectedAnime = function(animeId) {
  		Animes.selectedAnimeId = animeId;
  		console.log(animeId);
  		$stage.go('anime.animeinfo');
  	}
});
// .controller('AnimeInfoCtrl', function($scope) {

// });