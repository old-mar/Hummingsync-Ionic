angular.module('starter')
.controller('NavCtrl', function($scope, ionicMaterialInk, DbService) {
  ionicMaterialInk.displayEffect();

  $scope.refresh = function() {
  	console.log("Clicked refresh");
  	DbService.refresh();

  };
});
// .controller('AnimeInfoCtrl', function($scope) {

// });