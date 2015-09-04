angular.module('starter')
.controller('AnimeCtrl', function($scope, $state, $http,  DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();

  $scope.animelist = Animes.animelist;
  $scope.refresh = $http.get('https://hummingbird.me/api/v1/users/cyalins/library').then(function(data) {
  		Animes.animelist = data;
  		$scope.$broadcast('scroll.refreshComplete');
  },
  function(error) {
  	console.log(error);
  	$scope.$broadcast('scroll.refreshComplete');
  });

  $scope.openSelectedAnime = function(animeId) {
  		Animes.selectedAnimeId = animeId;
  		console.log(animeId);
  		$state.go('animeinfo');
  }
  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });