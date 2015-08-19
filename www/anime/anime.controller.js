angular.module('starter')
.controller('AnimeCtrl', function($scope, ionicMaterialInk, Animes) {
  ionicMaterialInk.displayEffect();

  $scope.animelist = Animes.all();


  $scope.openSelectedAnime = function(animeId) {
  		Animes.selectedAnimeId = animeId;
  		console.log(animeId);
  		$stage.go('anime.animeinfo');
  	}
});
// .controller('AnimeInfoCtrl', function($scope) {

// });