angular.module('starter')
.factory('Animes', function() {
  
  var animelist = [];

  var selectedAnimeId = undefined;
  return {
    animelist: animelist,
    selectedAnimeId: selectedAnimeId
  };

});