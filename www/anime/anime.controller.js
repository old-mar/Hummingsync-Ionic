angular.module('starter')
.controller('AnimeCtrl', function($scope, $state, $http,  DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();
  $scope.animelist = Animes.animelist;
  $scope.refresh = $http.get('https://hummingbird.me/api/v1/users/cyalins/library').then(function(res) {
  		console.log('data length: ' + res.data.length);
      console.log('pre-length: ' + Animes.animelist.length);
  		for(var i = 0; i < res.data.length; i++) {
        console.log('inside loop?~??');
        // console.log(JSON.stringify(data[i]));
        Animes.animelist.push(res.data[i]);
      }
      console.log('Pushed data to animelist');
      console.log('post-length: ' + Animes.animelist.length);
          $scope.$broadcast('scroll.refreshComplete');
  },
  function(error) {
  	console.log(error);
  	$scope.$broadcast('scroll.refreshComplete');
  });

  $scope.openSelectedAnime = function(animeId) {
  		Animes.selectedAnimeId = animeId;
  		console.log(animeId);
  		$state.go('animeinfo', {animeId: animeId});
  }
  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });