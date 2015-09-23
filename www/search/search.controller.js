angular.module('starter')
.controller('SearchCtrl', function($scope, $state, $http, $ionicSideMenuDelegate,  DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService, filterFilter, $log) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();

  var _this = this;

  $scope.searchresults = Animes.searchresults;
  _this.searchQuery = "";

  $scope.openSelectedAnime = function(animelibId) {
  		Animes.selectedAnime = filterFilter(Animes.animelist, {anime: {id: animelibId}});
  		$http({
        method: 'GET',
        url: 'https://hbrd-v1.p.mashape.com/anime/' + parseInt(animelibId),
        headers: {
          'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
          'Accept': 'application/json',
        }
      }).success(function(response){
        Animes.selectedAnimeFull = response;
        console.log("Retrieved full anime details.");
        console.log("response =" + response);
      }).error(function(response){
        console.log("Unable to retrieve full anime details.");
        console.log(response);
      }).then(function(){
        $state.go('app.animeinfo');
      });
  		console.log("libID: " + animelibId);
  		// console.log(Animes.selectedAnime[0]);
  		// console.log(Animes.selectedAnimeFull);
  };

  $scope.submitQuery = function() {
    var option = {
      method: 'GET',
      url: "https://hbrd-v1.p.mashape.com/search/anime?query=" + _this.searchQuery,
      headers: {
        'Content-Type': 'application/json',
        'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
        'Accept': 'application/json',
        // 'X-Client-Id': '36e1c3a4fcc4d1eaea3b'
      }
    };

    $log.debug("http option: " + JSON.stringify(option));

    $http(option).success(function(response){
      Animes.searchresults = response;
      $scope.searchresults = Animes.searchresults;
      console.log("Recieved and pushed search results to Animes service.");
      console.log(response);
    }).error(function(response){
      console.log("Unable to recieve search results.");
      console.log(response);
    });
  };

  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });