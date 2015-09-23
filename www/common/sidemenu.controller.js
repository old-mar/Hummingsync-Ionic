angular.module('starter')
.controller('SideMenuCtrl', function($scope, $state, $location, $http, Animes) {
  $(".button-collapse").sideNav();
  $scope.goToDebug = function() {
  	$state.go('app.debug', {reload: true});
  };
  $scope.goToProfile = function() {
    $http({
      method: 'GET',
      url: 'https://hbrd-v1.p.mashape.com/users/' + Animes.username,
      headers: {
          'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
          'Accept': 'application/json',
      }
    }).success(function(response){
      Animes.profiledetails = response;
      console.log(response);
    }).error(function(response){
      console.log("Error:" + response);
    }).then(function(){
      $state.go('app.profile');
    })
  };
  $scope.goToAnime = function() {
  	$state.go('app.animelist');
  };
  $scope.goToLogin = function() {
    Animes.username = undefined;
    Animes.auth_token = undefined;
  	$state.go('app.login');
  };
});