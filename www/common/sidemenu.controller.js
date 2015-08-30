angular.module('starter')
.controller('SideMenuCtrl', function($scope, $state) {

  $scope.goToDebug = function() {
  	$state.go('debug');
  };

});
