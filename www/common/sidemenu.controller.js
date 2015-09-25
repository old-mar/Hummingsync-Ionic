angular.module('starter')
.controller('SideMenuCtrl', function($scope, $state, $location, $http, $ionicPopover, Animes, DbService) {
  $(".button-collapse").sideNav();
  $scope.goToDebug = function() {
  	$state.go('app.debug', {reload: true});
  };
  $scope.goToProfile = function() {
    $('#loadingmodal').openModal();
    $http({
      method: 'GET',
      url: 'https://hbrd-v1.p.mashape.com/users/' + Animes.username,
      headers: {
          'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
          'Accept': 'application/json',
      }
    }).success(function(response){
      $('#loadingmodal').closeModal();
      Animes.profiledetails = response;
      console.log(response);
    }).error(function(response){
      $('#loadingmodal').closeModal();
      console.log("Error:" + response);
    }).then(function(){
      $state.go('app.profile');
    })
  };
  $scope.goToAnime = function() {
  	$state.go('app.animelist');
  };
  $scope.goToLogin = function() {
    Materialize.toast('Logged out of ' + Animes.username, 4000);
    Animes.username = undefined;
    Animes.auth_token = undefined;
  	$state.go('app.login');
  };

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
  $ionicPopover.fromTemplateUrl('templates/sortbypopover.html', {
    scope: $scope,
  }).then(function(sortbypopover) {
    $scope.sortbypopover = sortbypopover;
  });

  $scope.openPopover = function() {
    $scope.popover.show();
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.openSortByPopover = function() {
    $scope.sortbypopover.show();
  };

  $scope.setFilter = function(filter) {
    Animes.filter = filter;
    $scope.popover.hide();
    $scope.popover.remove();
    DbService.refresh();
  };

  $scope.setSort = function(sort) {
    console.log(sort);
    Animes.sort.order = sort;
    $scope.popover.hide();
    $scope.popover.remove();
    DbService.refresh();
  };
});