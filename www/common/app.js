// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic-material'])


.run(function($ionicPlatform, DbService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // Initialise DB after Ionic loaded and ready.
    DbService.initDB();
  });

})

.config(['$compileProvider', function($compileProvider) {
			$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
	}])

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js

	// if none of the below states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/animelist');

	$stateProvider
	// setup an abstract state for the tabs directive
	//   .state('tab', {
	//   url: '/animelist',
	//   abstract: true,
	//   templateUrl: 'animelist.html'
	// })

	// Each tab has its own nav history stack:

	.state('animelist', {
		url: '/animelist',
		templateUrl: 'anime/anime.html',
		controller: 'AnimeCtrl'
	})

	.state('animelist.animeinfo', {
	  url: '/animelist/animeinfo',
	  templateUrl: 'animeinfo/animeinfo.html'
	  controller: 'AnimeInfoCtrl'
	}); 
	//   .state('tab.task-detail', {
	//     url: '/dash/:taskId',
	//     views: {
	//       'tab-dash': {
	//         templateUrl: 'templates/task-detail.html',
	//         controller: 'TaskDetailCtrl'
	//       }
	//     }
	//   })
	// .state('tab.chats', {
	//     url: '/chats',
	//     views: {
	//       'tab-chats': {
	//         templateUrl: 'templates/tab-chats.html',
	//         controller: 'ChatsCtrl'
	//       }
	//     }
	//   })
	//   .state('tab.chat-detail', {
	//     url: '/chats/:chatId',
	//     views: {
	//       'tab-chats': {
	//         templateUrl: 'templates/chat-detail.html',
	//         controller: 'ChatDetailCtrl'
	//       }
	//     }
	//   })
	// .state('tab.account', {
	//   url: '/account',
	//   views: {
	//     'tab-account': {
	//       templateUrl: 'templates/tab-account.html',
	//       controller: 'AccountCtrl'
	//     }
	//   }
	// });

});




