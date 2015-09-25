angular.module('starter')
.controller('LoginCtrl', function($scope, $state, $http,  DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService) {
  ionicMaterialInk.displayEffect();
  ionicMaterialMotion.blinds();

  $scope.username = undefined;
  $scope.password = undefined;
  $scope.loginerrorShow = false;

  var showCircle = false;
  Animes.filter = 'currently-watching';

  $scope.goToAnime = function() {
    console.log("Attempting to send login data...");
    var showCircle = true;
    $('#loadingmodal').openModal();
  	$http({
  		method: 'POST',
  		url: "https://hummingbirdv1.p.mashape.com/users/authenticate",
  		data: {"password": $scope.password, "username": $scope.username},
  		headers: {
        'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        // 'X-Client-Id': '36e1c3a4fcc4d1eaea3b'
  		}
  	}).success(function(response){
      Materialize.toast('Logged in as ' + $scope.username, 4000);
      var showCircle = false;
      $('#loadingmodal').closeModal();
      Animes.username = $scope.username;
  		Animes.auth_token = response;
      $scope.username = undefined;
      $scope.password = undefined;
      console.log("Successful authentication; auth_token recieved.");
  		$state.go('app.animelist');
      console.log(Animes.filter);
      DbService.refresh();
  	}).error(function(response){
      var showCircle = false;
      $('#loadingmodal').closeModal();
      Materialize.toast('Failed to log in.', 4000);
      // $scope.loginerrorShow = true;
      console.log("Unable to send login data to server");
      console.log(response);
  	});
    
  };
  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
});
// .controller('AnimeInfoCtrl', function($scope) {

// });