angular.module('starter')
.controller('AnimeCtrl', function($scope, $state, $http, $ionicSideMenuDelegate,  DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService, filterFilter) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();
   $(document).ready(function() {
    $('select').material_select();
  });
   $(document).ready(function(){
      $('.parallax').parallax();
    });
  $ionicSideMenuDelegate.canDragContent(true);
  $scope.animelist = Animes.animelist;
  $scope.refresh = function() {
  		$scope.animelist.length = 0;
	 	 $http.get('https://hummingbird.me/api/v1/users/cyalins/library').then(function(res) {
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
	};

  $scope.openSelectedAnime = function(animeId,animelibId) {
  		Animes.selectedAnime = filterFilter(Animes.animelist, {id: animeId});
  		$http({
        method: 'GET',
        url: 'https://hbrd-v1.p.mashape.com/anime/' + animelibId,
        headers: {
          'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
          'Accept': 'application/json',
        }
      }).success(function(response){
        Animes.selectedAnimeFull = response;
        console.log("Retrieved full anime details.");
        console.log(response);
      }).error(function(response){
        console.log("Unable to retrieve full anime details.");
        console.log(response);
      }).then(function(){
        $state.go('app.animeinfo', {animeId: animeId});
      });

      console.log(animeId);
  		console.log(Animes.selectedAnime[0]);
  		// console.log(Animes.selectedAnimeFull);
  		
  };

  $scope.openSearch = function() {
    $state.go('app.search');
  }


  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });