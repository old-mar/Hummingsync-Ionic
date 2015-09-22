angular.module('starter')
.controller('DebugCtrl', function($scope, DebugService) {
	
  $scope.debug = DebugService.debug.log;

  
});
