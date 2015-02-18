angular.module('hopulous', ['ionic', 'hopulous.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        /*
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }*/
        
        //When the device is ready, prepare the camera.
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;

        navigator.geolocation.getCurrentPosition(onGpsSuccess, onGpsFail);
        
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
    })

	.state('app.recommended', {
		url: "/recommended",
		views: {
			'menuContent': {
				templateUrl: "templates/recommended.html",
				controller: 'RecBeerCtrl'
			}
		}
	})
	
	.state('app.places', {
		url: "/places",
		views: {
			'menuContent': {
				templateUrl: "templates/places.html",
				controller: 'PlacesCtrl'
			}
		}
	})

    .state('app.beer-profile', {
		url: "/recommended/:beerId",
		views: {
		  'menuContent': {
			templateUrl: "templates/beer-profile.html",
			controller: 'BeerProfileCtrl'
		  }
		}
    });

// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/app/recommended');
});
