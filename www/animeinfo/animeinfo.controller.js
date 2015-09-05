angular.module('starter')
.controller('AnimeInfoCtrl', function($scope, $state, $stateParams, $ionicModal, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  
  $stateParams.animeId == undefined;
  ionicMaterialInk.displayEffect();
  $scope.anime = DbService.get($stateParams.animeId);
  console.log($stateParams.animeId);


  //editor
  $ionicModal.fromTemplateUrl('editanime.html', function(modal) {
    $scope.editModal = modal;
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
});