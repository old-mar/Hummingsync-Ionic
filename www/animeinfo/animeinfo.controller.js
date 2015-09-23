angular.module('starter')
.controller('AnimeInfoCtrl', function($scope, $ionicSideMenuDelegate, $state, $stateParams, $ionicModal, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  // $ionicSideMenuDelegate.canDragContent(false);
  $stateParams.animeId == undefined;
  ionicMaterialInk.displayEffect();

   $(document).ready(function(){
      $('.parallax').parallax();
    });

   $(document).ready(function(){
    $('.materialboxed').materialbox();
  });

  var options = [
    {selector: '#image-test', offset: 500, callback: 'Materialize.fadeInImage("{{anime.anime.poster_image}}")' }
  ];
  Materialize.scrollFire(options);
  // $scope.anime = DbService.get($stateParams.animeId);
  // console.log($stateParams.animeId);

  $scope.anime = Animes.selectedAnime[0];
  $scope.fullanime = Animes.selectedAnimeFull;

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
  }

});