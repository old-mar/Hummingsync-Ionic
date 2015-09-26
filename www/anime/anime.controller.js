angular.module('starter')
.controller('AnimeCtrl', function($scope, $state, $http, $ionicSideMenuDelegate, $ionicScrollDelegate, $document, DebugService, ionicMaterialInk, ionicMaterialMotion, Animes, DbService, filterFilter) {
  ionicMaterialInk.displayEffect();

   $(document).ready(function() {
    $('select').material_select();
  });
   $(document).ready(function(){
      $('.parallax').parallax();
    });
  $ionicSideMenuDelegate.canDragContent(true);
  $scope.animelist = Animes.animelist;

  var scrollposition = undefined;
  $scope.filter = Animes.filter;
  $scope.sort = Animes.sort;
  console.log("Sort: " + $scope.sort.order);

  $scope.refresh = function() {
  	$scope.animelist.length = 0;
	 	$http({
      method: 'GET',
      url: 'https://hummingbirdv1.p.mashape.com/users/'+ Animes.username + '/library?auth_token=' + Animes.auth_token + "&status=" + Animes.filter,
      headers: {
        'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
        'Accept': 'application/json'
      }
    }).then(function(res) {
  		console.log('data length: ' + res.data.length);
      	console.log('pre-length: ' + Animes.animelist.length);
  		for(var i = 0; i < res.data.length; i++) {
        console.log('Pushing library data entries...');
        // console.log(JSON.stringify(data[i]));
        Animes.animelist.push(res.data[i]);
      }
      console.log('Pushed data to animelist');
      console.log('post-length: ' + Animes.animelist.length);
      $scope.$broadcast('scroll.refreshComplete');
	  },
	  function(error) {
	  	console.log(error);
	  	$scope.$broadcast('scroll.refreshComplete');
	  });
	};

  $scope.openSelectedAnime = function(animeId,animelibId) {
      console.log("Downloading full show details...");
      scrollposition = $ionicScrollDelegate.$getByHandle('animelistcontent').getScrollPosition();
      $('#openmodal').openModal();
      $scope.animelist.length = 0;
      $http({
        method: 'GET',
        url: 'https://hummingbirdv1.p.mashape.com/users/'+ Animes.username + '/library?auth_token=' + Animes.auth_token + "&status=" + Animes.filter,
        headers: {
          'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
          'Accept': 'application/json'
        }
      }).then(function(res) {
        console.log('data length: ' + res.data.length);
        console.log('pre-length: ' + Animes.animelist.length);
        for(var i = 0; i < res.data.length; i++) {
          console.log('Pushing library data entries...');
          // console.log(JSON.stringify(data[i]));
          Animes.animelist.push(res.data[i]);
        }
        console.log('Pushed data to animelist');
        console.log('post-length: ' + Animes.animelist.length);
        $ionicScrollDelegate.$getByHandle('animelistcontent').scrollTo(0, scrollposition.top, true);
        Animes.selectedAnime = filterFilter(Animes.animelist, {id:animeId}, true);
    		$http({
          method: 'GET',
          url: 'https://hbrd-v1.p.mashape.com/anime/' + animelibId,
          headers: {
            'X-Mashape-Key': 'WYIjQHHS7pmshGy6W5vPf63xlY1up1bePRvjsn3K7AoVDYwltl',
            'Accept': 'application/json',
          }
        }).success(function(response){
          $('#openmodal').closeModal();
          Animes.selectedAnimeFull = response;
          console.log("Retrieved full anime details.");
          console.log(response);
        }).error(function(response){
          $('#openmodal').closeModal();
          console.log("Unable to retrieve full anime details.");
          console.log(response);
        }).then(function(){
          $state.go('app.animeinfo', {animeId: animeId});
      });

      console.log(animeId);
  		console.log(Animes.selectedAnime[0]);
  		// console.log(Animes.selectedAnimeFull);
  		});
  };

  $scope.openSearch = function() {
    $state.go('app.search');
  }


});
// .controller('AnimeInfoCtrl', function($scope) {

// });