angular.module('starter')
.factory('DbService', function($q, $http, Animes, DebugService) {
  var _db;

  function initDB() {
    // Creates the DB or opens it if it already exists.
    DebugService.add('inside initDb()');
    _db = new PouchDB('animelist', {adapter: 'websql', size: 10});

    DebugService.add('db hopefully created');

    var deferred = $q.defer();

    // If DB is empty, add seed data
    _db.info().then(function(res) {
      DebugService.add('db document count: ' + res.doc_count);
      console.log('db document count: ' + res.doc_count);
      if (res.doc_count === 0) {
        _db.bulkDocs().then(function() {
          DebugService.add('Adding items to db');
          deferred.resolve('Adding items to db');
        }, function(err) {
          DebugService.add('Error adding bulk docs: ' + err);
          deferred.reject('Error adding bulk docs: ' + err);
        });
      } else {
        DebugService.add('there are ' + res.doc_count + ' documents in the db!');
        console.log('there are ' + res.doc_count + ' documents in the db!');
        deferred.resolve('No need to add docs cos there are some there!');
      }
    });

    return deferred.promise;
  };

  // Fetch a document
  function get(docId) {
    return $q.when(_db.get(docId));
  };

  // Fetch all documents and return an array
  function getAll() {
    // http://pouchdb.com/api.html#batch_fetch
    // _db.allDocs() returns an array, but it includes extra info in the returned object like total number of rows etc.
    //
    // we only want to return an array with the data (excluding the extra info), 
    //    so after _db.allDocs() returns an object (see url above for example of what's returned), 
    //    we take each of the objects inside the returned 'rows' array and add it to the Animes.animelist array
    var deferred = $q.defer();
    
    _db.allDocs({ include_docs: true }).then(function(docs) {
      docs.rows.map(function(row) {
        Animes.animelist.push(row.doc);
      });
      deferred.resolve('Finished adding all docs to array');
    });
    return deferred.promise;
  };

  // Create / update a document
  // Note: _id must be specified. If you don't want to specificy _id, use post.
  // If doc doesn't exist, will create it
  function put(doc) {
    return $q.when(_db.put(doc));
  };

  // PouchDB automatically creates _id
  function post(doc) {
    return $q.when(_db.post(doc));
  };

  // Bulk create/update of docs, takes an array.
  function bulkChange(ary) {
    return $q.when(_db.bulkDocs(ary));
  };

  function remove(doc) {
    return $q.when(_db.remove(doc));
  };

  function destroy() {
    return $q.when(_db.destroy());
  };

  function refresh() {
    Animes.animelist.length = 0;
    $http.get('https://hummingbird.me/api/v1/users/cyalins/library').then(function(res) {
        console.log('data length: ' + res.data.length);
        console.log('pre-length: ' + Animes.animelist.length);
        for(var i = 0; i < res.data.length; i++) {
          console.log('inside loop?~??');
          // console.log(JSON.stringify(data[i]));
          Animes.animelist.push(res.data[i]);
        }
        console.log('Pushed data to animelist');
        console.log('post-length: ' + Animes.animelist.length);
            // $scope.$broadcast('scroll.refreshComplete');
    },
    function(error) {
      console.log(error);
      // $scope.$broadcast('scroll.refreshComplete');
    });

    // return $q.when(_db.destroy());
    
  };

  return {
    initDB: initDB,
    get: get,
    getAll: getAll,
    post: post,
    put: put,
    remove: remove,
    bulkChange: bulkChange,
    destroy: destroy,
    refresh: refresh
  };

});