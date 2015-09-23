angular.module('starter')
.controller('LoginCtrl', function($scope, $state, $http,  DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();

  var username = undefined;
  var password = undefined;

  $scope.goToAnime = function() {
  	$http({
  		method: 'POST',
  		url: "https://hummingbirdv1.p.mashape.com/users/authenticate",
  		data: {"password": "hello1234", "username": "cyalins"},
  		headers: {
        'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        // 'X-Client-Id': '36e1c3a4fcc4d1eaea3b'
  		}
  	}).success(function(response){
  		Animes.auth_token = response;
      console.log("Successful authentication; auth_token recieved.");
  		$state.go('app.animelist');
  	}).error(function(response){
      console.log("Unable to send login data to server");
      console.log(response);
  	});
    
  };
  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });