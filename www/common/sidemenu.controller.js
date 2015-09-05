angular.module('starter')
.controller('SideMenuCtrl', function($scope, $state) {

  $scope.goToDebug = function() {
  	$state.go('debug');
  };

  $scope.goToAnime = function() {
  	$state.go('animelist');
  };
  $scope.goToLogin = function() {
  	$state.go('login');
  };
});
