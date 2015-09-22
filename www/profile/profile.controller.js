angular.module('starter')
.controller('ProfileCtrl', function($scope, $state, $http,  DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();
   $(document).ready(function() {
    $('select').material_select();
  });

  $scope.goToAnime = function() {
    $state.go('app.animelist');
  };
  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });