angular.module('starter')
.controller('AnimeCtrl', function($scope, ionicMaterialInk, Animes, DbService) {
  ionicMaterialInk.displayEffect();

  DbService.getAll().then(function(res) {
  	$scope.animelist = res;
  });

  $scope.openSelectedAnime = function(animeId) {
  		Animes.selectedAnimeId = animeId;
  		console.log(animeId);
  		$stage.go('anime.animeinfo');
  	}
});
// .controller('AnimeInfoCtrl', function($scope) {

// });