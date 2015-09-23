angular.module('starter')
.factory('Animes', function() {


  var animelist = [];

  var selectedAnime = undefined;
  var selectedAnimeFull = undefined;
  var searchresults = [];
  return {
    animelist: animelist,
    searchresults: searchresults,
    selectedAnime: selectedAnime
  };

  var username = undefined;
  var auth_token = undefined;


  // function foo() {
  //   authenticate();
  // }

  // function authenticate() {
  // 	$http()
  // };



});