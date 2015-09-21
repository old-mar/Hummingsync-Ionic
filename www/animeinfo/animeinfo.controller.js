angular.module('starter')
.controller('AnimeInfoCtrl', function($scope, $state, $stateParams, $ionicModal, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  
  $stateParams.animeId == undefined;
  ionicMaterialInk.displayEffect();
  // $scope.anime = DbService.get($stateParams.animeId);
  // console.log($stateParams.animeId);

  $scope.anime = Animes.selectedAnime[0];

  //editor
  $ionicModal.fromTemplateUrl('editanime.html', function(modal) {
    $scope.editModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-right'
  });

  $ionicModal.fromTemplateUrl('openimage.html', function(modal) {
    $scope.imageModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-right'
  });

  $scope.openAnimeEdit = function(animeId) {
  	$scope.editModal.show();
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