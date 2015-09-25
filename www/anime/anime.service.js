angular.module('starter')
.factory('Animes', function() {


  var animelist = [];

  var selectedAnime = undefined;
  var selectedAnimeFull = undefined;
  var searchresults = [];

  var username = undefined;
  var auth_token = undefined;

  var filter = 'currently-watching';
  var sort = { order: 'anime.title' };

  return {
    animelist: animelist,
    searchresults: searchresults,
    selectedAnime: selectedAnime,
    username: username,
    auth_token: auth_token,
    filter: filter,
    sort: sort
  };

  // function foo() {
  //   authenticate();
  // }

  // function authenticate() {
  // 	$http()
  // };



});