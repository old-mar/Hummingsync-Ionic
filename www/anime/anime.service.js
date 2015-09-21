angular.module('starter')
.factory('Animes', function() {
  
  var animelist = [];

  var selectedAnime = undefined;
  return {
    animelist: animelist,
    selectedAnimeId: selectedAnimeId
  };

});