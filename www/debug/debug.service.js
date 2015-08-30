angular.module('starter')
.factory('DebugService', function($q, Animes) {
  var debug = {
    log: []
  };

  function add(event) {
    // Creates the DB or opens it if it already exists.
    debug.log.push(event);
  };

  return {
    debug: debug,
    add: add
  };

});