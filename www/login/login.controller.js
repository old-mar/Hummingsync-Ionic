angular.module('starter')
.controller('LoginCtrl', function($scope, $state, $http,  DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();

  var username = undefined;
  var password = undefined;

  $scope.goToAnime = function() {
  	$http({
  		method: 'POST',
  		url: "https://hummingbird.me/api/v1/users/authenticate",
  		data: {"username": username, "password": password},
  		headers: {
  			'Access-Control-Allow-Origin': '*'
  		}
  	}).success(function(response){
  		Animes.auth_token = response;
  		$state.go('app.animelist');
  	}).error(function(response){

  	});
    
  };
  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });