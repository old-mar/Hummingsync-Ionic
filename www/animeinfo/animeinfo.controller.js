angular.module('starter')
.controller('AnimeInfoCtrl', function($scope, $ionicSideMenuDelegate, $state, $stateParams, $ionicModal, $http, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  // $ionicSideMenuDelegate.canDragContent(false);
  $stateParams.animeId == undefined;
  ionicMaterialInk.displayEffect();

   $(document).ready(function(){
      $('.parallax').parallax();
    });

   $(document).ready(function(){
    $('.materialboxed').materialbox();
  });
   $(document).ready(function() {
    $('select').material_select();
  });

  var options = [
    {selector: '#image-test', offset: 500, callback: 'Materialize.fadeInImage("{{anime.anime.poster_image}}")' }
  ];
  Materialize.scrollFire(options);
  // $scope.anime = DbService.get($stateParams.animeId);
  // console.log($stateParams.animeId);

  $scope.anime = Animes.selectedAnime[0];
  $scope.fullanime = Animes.selectedAnimeFull;
  $scope.auth_token = Animes.auth_token;

  //editor
  // $ionicModal.fromTemplateUrl('animeinfo/animeedit.html', function(modal) {
  //   $scope.editModal = modal;
  // }, {
  //   scope: $scope,
  //   animation: 'slide-in-right'
  // });

  $ionicModal.fromTemplateUrl('openimage.html', function(modal) {
    $scope.imageModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-right'
  });

  $scope.openAnimeEdit = function(animeId) {
  	$state.go('app.animeedit')
  };

  $scope.openImage = function() {
    $scope.imageModal.show();
  };
  $scope.closeImage = function() {
    $scope.imageModal.hide();
  };

  $scope.editClicked = function() {
    Animes.authenticate();
  };

  $scope.addEpisodeClicked = function() {
    console.log("Attempting to add an episode to counter...");
    $('#sendingmodal').openModal();
    console.log("Posting to URL: https://hbrd-v1.p.mashape.com/libraries/" + $scope.fullanime.id);
    $http({
      method: 'POST',
      url: "https://hbrd-v1.p.mashape.com/libraries/" + $scope.fullanime.id,
      data: { 
        "auth_token": $scope.auth_token,
        "increment_episodes": 'true'
      },
      headers: {
        'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).success(function(response){
      $('#sendingmodal').closeModal();
      Materialize.toast('Successfully added an episode.', 4000);
      Animes.selectedAnime[0] = response;
      $scope.anime = Animes.selectedAnime[0];
      console.log("Successfully added an episode. Library has been updated and refreshed.");
      console.log(response);
      // DbService.refresh();
    }).error(function(response){
      $('#sendingmodal').closeModal();
      Materialize.toast('Failed to add an episode; ' + response, 4000);
      console.log("Unable to send data to server.");
      console.log(response);
    });
  };

  $scope.submitLibraryUpdate = function() {
    $('#sendingmodal').openModal();
    if ($scope.anime.private = true) {$scope.anime.private = 'private'} if ($scope.anime.private = false) {$scope.anime.private = 'public'};
    $http({
      method: 'POST',
      url: "https://hbrd-v1.p.mashape.com/libraries/" + $scope.fullanime.id,
      data: { 
        "auth_token": $scope.auth_token,
        "episodes_watched": $scope.anime.episodes_watched,
        "status": $scope.anime.status,
        "rating": $scope.anime.rating.value,
        "privacy": 'public',
        "rewatching": $scope.anime.rewatching,
        "rewatched_times": $scope.anime.rewatched_times,
        "notes": $scope.anime.notes
      },
      headers: {
        'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).success(function(response){
      $('#sendingmodal').closeModal();
      Materialize.toast('Successfully updated your library entry.', 4000);
      Animes.selectedAnime[0] = response;
      $scope.anime = Animes.selectedAnime[0];
      console.log("Successfully updated.");
      console.log(response);
    }).error(function(response){
      $('#sendingmodal').closeModal();
      Materialize.toast('Failed to update; ' + response, 4000);
      console.log("Unable to send data to server.");
      console.log(response);
    });
  };

});