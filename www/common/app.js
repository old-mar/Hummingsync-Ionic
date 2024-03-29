// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic-material', 'door3.css', 'duScroll'])


.run(function($ionicPlatform, DbService, DebugService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    DebugService.add('should always have something here');
    
    // Initialise DB after Ionic loaded and ready.
    DbService.initDB().then(function(res) {
    	DebugService.add(res);
    	console.log(res);
    	DbService.getAll().then(function(res) {
    		DebugService.add(res);
    		console.log(res);
    	});
    });

    // DbService.refresh();


  });
})

.config(['$compileProvider', function($compileProvider) {
			$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
	}])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js

	if (ionic.Platform.isAndroid()) {
      $ionicConfigProvider.scrolling.jsScrolling(false);
    };

	// $ionicConfigProvider.views.maxCache(0);

	
	// if none of the below states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/login');

	$stateProvider
	// setup an abstract state for the tabs directive
	//   .state('tab', {
	//   url: '/animelist',
	//   abstract: true,
	//   templateUrl: 'animelist.html'
	// })

	
	// Each tab has its own nav history stack:
	.state('app', {
		url: '/app',
		templateUrl: 'common/app.html',
		abstract: true
	})

	.state('app.login', {
		url: '/login',
		templateUrl: 'login/login.html',
		controller: 'LoginCtrl',
		css: ['css/style.css', 'css/loginstyle.css']
	})

	.state('app.profile', {
		url: '/profile',
		templateUrl: 'profile/profile.html',
		controller: 'ProfileCtrl',
		css: 'css/profilestyle.css'
	})

	.state('app.animelist', {
		url: '/animelist',
		templateUrl: 'anime/anime.html',
		controller: 'AnimeCtrl',
		css: 'css/style.css'
	})

	.state('app.animeinfo', {
	  url: '/animelist/{animeId}',
	  templateUrl: 'animeinfo/animeinfo.html',
	  controller: 'AnimeInfoCtrl',
	  css: 'css/animeinfostyle.css'
	})

	.state('app.animeedit', {
	  url: '/animelist/{animeId}/edit',
	  templateUrl: 'animeinfo/animeedit.html',
	  controller: 'AnimeInfoCtrl',
	  css: 'css/animeeditstyle.css'
	})

	.state('app.search', {
	  url: '/search',
	  templateUrl: 'search/search.html',
	  controller: 'SearchCtrl',
	  css: 'css/searchstyle.css'
	})

	.state('app.debug', {
		url: '/debug',
		templateUrl: 'debug/debug.html',
		controller: 'DebugCtrl'
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

document.addEventListener("deviceready", function onDeviceReady(w) {
    // Should work on Android
    if(StatusBar && statusbarTransparent) {
        // Enable translucent statusbar
        statusbarTransparent.enable();

        // Get the bar back
        StatusBar.show();
    }
    // iOS only
    else if (StatusBar) {
        // Get the bar back
        StatusBar.show();
    }
}, false);

document.addEventListener('deviceready', function(event) 
    {
        function successFunction()
      {
          console.log("It worked!");
      }

      function errorFunction(error)
      {
          console.log(error);
      }

      function trace(value)
      {
          console.log(value);
      }

      // Is this plugin supported?
      AndroidFullScreen.isSupported();

      // Is immersive mode supported?
      AndroidFullScreen.isImmersiveModeSupported(successFunction, errorFunction);

      // The width of the screen in immersive mode
      AndroidFullScreen.immersiveWidth(trace, errorFunction);

      // The height of the screen in immersive mode
      AndroidFullScreen.immersiveHeight(trace, errorFunction);

      // Hide system UI until user interacts
      // AndroidFullScreen.leanMode(successFunction, errorFunction);

      // Show system UI
      // AndroidFullScreen.showSystemUI(successFunction, errorFunction);

      // Extend your app underneath the system UI (Android 4.4+ only)
      AndroidFullScreen.showUnderSystemUI(successFunction, errorFunction);

      // Hide system UI and keep it hidden (Android 4.4+ only)
      // AndroidFullScreen.immersiveMode(successFunction, errorFunction);
      
  // document.getElementById('button-fab').classList.toggleClass('spiral-back');
  });

