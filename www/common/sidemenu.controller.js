angular.module('starter')
.controller('SideMenuCtrl', function($scope, $state, $location) {

  $scope.goToDebug = function() {
  	$state.go('app.debug', {reload: true});
  };
  $scope.goToProfile = function() {
  	$state.go('app.profile');
  };
  $scope.goToAnime = function() {
  	$state.go('app.animelist');
  };
  $scope.goToLogin = function() {
  	$state.go('app.login');
  };
});