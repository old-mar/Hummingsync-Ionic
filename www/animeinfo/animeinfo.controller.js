angular.module('starter')
.controller('AnimeInfoCtrl', function($scope, $ionicSideMenuDelegate, $state, $stateParams, $ionicModal, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  $ionicSideMenuDelegate.canDragContent(false);
  $stateParams.animeId == undefined;
  ionicMaterialInk.displayEffect();
  // $(document).ready(function() {
  //   $('select').material_select();
  // });
  // $scope.anime = DbService.get($stateParams.animeId);
  // console.log($stateParams.animeId);

  $scope.anime = Animes.selectedAnime[0];
  $scope.fullanime = Animes.selectedAnime[0].anime.id;

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
  $scope.closeAnimeEdit = function() {
  	$scope.editModal.hide();
  };

  $scope.openImage = function() {
    $scope.imageModal.show();
  };
  $scope.closeImage = function() {
    $scope.imageModal.hide();
  };
});