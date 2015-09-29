angular.module('starter')
.controller('SearchCtrl', function($scope, $state, $http, $ionicSideMenuDelegate, DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService, filterFilter, $log) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();

  var _this = this;


  $scope.searchresults = Animes.searchresults;
  _this.searchQuery = "";
  $scope.animelist = Animes.animelist;

  $scope.openSelectedAnime = function(animeId,animelibId) {
    console.log("Downloading full show details...");
    $('#openmodal').openModal();
    // Animes.animeposter = filterFilter(Animes.animelist, {id:animeId}, true)[0].anime.cover_image;
    $http({
      method: 'GET',
      url: 'https://hbrd-v1.p.mashape.com/anime/' + animelibId,
      headers: {
        'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
        'Accept': 'application/json',
      }
    }).success(function(response){
      $('#openmodal').closeModal();
      Animes.selectedAnimeDetails = response;
      // Animes.animeposter = Animes.selectedAnimeFull.cover_image;
      console.log("Retrieved full anime details.");
      console.log(response);
    }).error(function(response){
      $('#openmodal').closeModal();
      console.log("Unable to retrieve full anime details.");
      console.log(response);
    }).then(function(){
      $state.go('app.animeinfo', {animeId: animeId});
    });
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
    $('#openmodal').openModal();
    $log.debug("http option: " + JSON.stringify(option));
    console.log("Sending search query...");
    $http(option).success(function(response){
      $('#openmodal').closeModal();
      Animes.searchresults = response;
      $scope.searchresults = Animes.searchresults;
      console.log("Recieved and pushed search results to Animes service.");
      console.log(response);
    }).error(function(response){
      $('#openmodal').closeModal();
      console.log("Unable to recieve search results.");
      console.log(response);
    });
  };

  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });