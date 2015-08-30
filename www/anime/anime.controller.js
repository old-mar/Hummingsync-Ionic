angular.module('starter')
.controller('AnimeCtrl', function($scope, $state, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();

  $scope.animelist = Animes.animelist;

  $scope.openSelectedAnime = function(animeId) {
  		Animes.selectedAnimeId = animeId;
  		console.log(animeId);
  		$state.go('animeinfo');
  }
  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });