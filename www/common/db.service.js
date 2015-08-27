angular.module('starter')
.factory('DbService', function($q, Animes) {
  var _db;

  function initDB() {
    // Creates the DB or opens it if it already exists.
    _db = new PouchDB('animelist');

    var deferred = $q.defer();

    // If DB is empty, add seed data
    _db.info().then(function(res) {
      console.log('db document count: ' + res.doc_count);
      if (res.doc_count === 0) {
        _db.bulkDocs([{"id":10703547,"episodes_watched":22,"last_watched":"2015-08-10T06:42:36.500Z","updated_at":"2015-08-10T06:54:48.956Z","rewatched_times":0,"notes":"","notes_present":false,"status":"completed","private":false,"rewatching":false,"anime":{"id":8403,"mal_id":23273,"slug":"shigatsu-wa-kimi-no-uso","status":"Finished Airing","url":"https://hummingbird.me/anime/shigatsu-wa-kimi-no-uso","title":"Shigatsu wa Kimi no Uso","alternate_title":"Your Lie in April","episode_count":22,"episode_length":23,"cover_image":"https://static.hummingbird.me/anime/poster_images/000/008/403/large/acgdb.com-27d1f1af31750bf81ddd7496a5eadf6bc2989d74.jpg?1425430943","synopsis":"Piano prodigy Arima Kosei dominated the competition and all child musicians knew his name. But after his mother, who was also his instructor, passed away, he had a mental breakdown while performing at a recital that resulted in him no longer being able to hear the sound of his piano even though his hearing was perfectly fine. Even two years later, Kosei hasn't touched the piano and views the world in monotone, and without any flair or color. He was content at living out his life with his good friends Tsubaki and Watari until, one day, a girl changed everything. Miyazono Kaori is a pretty, free spirited violinist whose playing style reflects her personality. Kaori helps Kosei return to the music world and show that it should be free and mold breaking unlike the structured and rigid style Kosei was used to.\r\n\r\n(Source: MangaHelpers)","show_type":"TV","started_airing":"2014-10-10","finished_airing":"2015-03-20","community_rating":4.41055911708414,"age_rating":"PG13","genres":[{"name":"Drama"},{"name":"Romance"},{"name":"School"},{"name":"Music"}]},"rating":{"type":"advanced","value":"5.0"}},{"id":10703554,"episodes_watched":24,"last_watched":"2015-08-10T06:43:24.534Z","updated_at":"2015-08-10T06:54:47.347Z","rewatched_times":0,"notes":"","notes_present":false,"status":"completed","private":false,"rewatching":false,"anime":{"id":8147,"mal_id":22535,"slug":"kiseijuu","status":"Finished Airing","url":"https://hummingbird.me/anime/kiseijuu","title":"Kiseijuu: Sei no Kakuritsu","alternate_title":"Parasyte -the maxim-","episode_count":24,"episode_length":23,"cover_image":"https://static.hummingbird.me/anime/poster_images/000/008/147/large/iimULfF3qgJiE.jpg?1416444566","synopsis":"The 17-year-old Izumi Shinichi lives with his mother and father in a quiet neighborhood in Tokyo. One night, worm-like aliens called Parasytes invade Earth, taking over the brains of human hosts by entering through their ears or noses. One Parasyte attempts to crawl into Shinichi's ear while he sleeps, but fails since he is wearing headphones, and enters his body by burrowing into his arm instead, taking over his right hand and is named Migi.\n\nBecause Shinichi was able to prevent Migi from traveling further up into his brain, both beings retain their separate intellect and personality. As the duo encounter other Parasytes, they capitalize on their strange situation and gradually form a strong bond, working together to survive. This gives them an edge in battling other Parasytes, who frequently attack the pair upon realization that Shinichi's human brain is still intact. Shinichi feels compelled to fight other Parasytes, who devour humans as food, while enlisting Migi's help.\n","show_type":"TV","started_airing":"2014-10-09","finished_airing":"2015-03-26","community_rating":4.35860117673678,"age_rating":"R17+","genres":[{"name":"Action"},{"name":"Drama"},{"name":"Sci-Fi"},{"name":"Horror"},{"name":"Psychological"}]},"rating":{"type":"advanced","value":"4.5"}}]).then(function(res) {
          deferred.resolve(res);  
        }, function(err) {
          console.error('error adding docs to db: ' + err);
        })
      }
      else
      {
        getAll().then(function(result) {
          console.log('got results: ' + JSON.stringify(result));
          deferred.resolve(result);
        }, function(err) {
          console.err('error getting all docs: ' + err);
        });
      }
    });
    return deferred.promise
  };

  // Fetch a document
  function get(doc) {
    return $q.when(_db.get(doc));
  };

  // Fetch all documents and return an array
  function getAll() {
    // http://pouchdb.com/api.html#batch_fetch
    // _db.allDocs() returns an array, but it includes extra info in the returned object like total number of rows etc.
    //
    // we only want to return an array with the data (excluding the extra info), 
    //    so after _db.allDocs() returns an object (see url above for example of what's returned), 
    //    we take each of the objects inside the returned 'rows' array and add it to a new array (_resAry),
    //    which is what we return after another service/controller calls DbService.getAll().
    var deferred = $q.defer();
    
    _db.allDocs({ include_docs: true }).then(function(docs) {
      var _resAry = docs.rows.map(function(row) {
        return row.doc;
      });
      deferred.resolve(_resAry);
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
    _db.destroy().then(function() {
      _db = new PouchDB('animelist');

      _db.info().then(function(res) {
        console.log('db document count: ' + res.doc_count);
        if (res.doc_count === 0) {
          return $q.when(_db.bulkDocs([{"id":10703547,"episodes_watched":22,"last_watched":"2015-08-10T06:42:36.500Z","updated_at":"2015-08-10T06:54:48.956Z","rewatched_times":0,"notes":"","notes_present":false,"status":"completed","private":false,"rewatching":false,"anime":{"id":8403,"mal_id":23273,"slug":"shigatsu-wa-kimi-no-uso","status":"Finished Airing","url":"https://hummingbird.me/anime/shigatsu-wa-kimi-no-uso","title":"Shigatsu wa Kimi no Uso","alternate_title":"Your Lie in April","episode_count":22,"episode_length":23,"cover_image":"https://static.hummingbird.me/anime/poster_images/000/008/403/large/acgdb.com-27d1f1af31750bf81ddd7496a5eadf6bc2989d74.jpg?1425430943","synopsis":"Piano prodigy Arima Kosei dominated the competition and all child musicians knew his name. But after his mother, who was also his instructor, passed away, he had a mental breakdown while performing at a recital that resulted in him no longer being able to hear the sound of his piano even though his hearing was perfectly fine. Even two years later, Kosei hasn't touched the piano and views the world in monotone, and without any flair or color. He was content at living out his life with his good friends Tsubaki and Watari until, one day, a girl changed everything. Miyazono Kaori is a pretty, free spirited violinist whose playing style reflects her personality. Kaori helps Kosei return to the music world and show that it should be free and mold breaking unlike the structured and rigid style Kosei was used to.\r\n\r\n(Source: MangaHelpers)","show_type":"TV","started_airing":"2014-10-10","finished_airing":"2015-03-20","community_rating":4.41055911708414,"age_rating":"PG13","genres":[{"name":"Drama"},{"name":"Romance"},{"name":"School"},{"name":"Music"}]},"rating":{"type":"advanced","value":"5.0"}},{"id":10703554,"episodes_watched":24,"last_watched":"2015-08-10T06:43:24.534Z","updated_at":"2015-08-10T06:54:47.347Z","rewatched_times":0,"notes":"","notes_present":false,"status":"completed","private":false,"rewatching":false,"anime":{"id":8147,"mal_id":22535,"slug":"kiseijuu","status":"Finished Airing","url":"https://hummingbird.me/anime/kiseijuu","title":"Kiseijuu: Sei no Kakuritsu","alternate_title":"Parasyte -the maxim-","episode_count":24,"episode_length":23,"cover_image":"https://static.hummingbird.me/anime/poster_images/000/008/147/large/iimULfF3qgJiE.jpg?1416444566","synopsis":"The 17-year-old Izumi Shinichi lives with his mother and father in a quiet neighborhood in Tokyo. One night, worm-like aliens called Parasytes invade Earth, taking over the brains of human hosts by entering through their ears or noses. One Parasyte attempts to crawl into Shinichi's ear while he sleeps, but fails since he is wearing headphones, and enters his body by burrowing into his arm instead, taking over his right hand and is named Migi.\n\nBecause Shinichi was able to prevent Migi from traveling further up into his brain, both beings retain their separate intellect and personality. As the duo encounter other Parasytes, they capitalize on their strange situation and gradually form a strong bond, working together to survive. This gives them an edge in battling other Parasytes, who frequently attack the pair upon realization that Shinichi's human brain is still intact. Shinichi feels compelled to fight other Parasytes, who devour humans as food, while enlisting Migi's help.\n","show_type":"TV","started_airing":"2014-10-09","finished_airing":"2015-03-26","community_rating":4.35860117673678,"age_rating":"R17+","genres":[{"name":"Action"},{"name":"Drama"},{"name":"Sci-Fi"},{"name":"Horror"},{"name":"Psychological"}]},"rating":{"type":"advanced","value":"4.5"}}]));
        }
      });
    })

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