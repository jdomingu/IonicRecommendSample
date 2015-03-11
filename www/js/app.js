var hopulous = angular.module('hopulous', ['ionic', 'controllers', 'services']);

hopulous.run(function($ionicPlatform, $rootScope) {
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
        
        console.log('Device ready');

        // When the device is ready, prepare the camera.
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        
    });
});

hopulous.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
    })

	.state('app.home', {
		url: '/home',
		views: {
			'menuContent': {
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl'
			}
		}
	})

	.state('app.recommended', {
		url: '/recommended',
		views: {
			'menuContent': {
				templateUrl: 'templates/recommended.html',
				controller: 'RecBeerCtrl',
                resolve: {
                    beerList: function(beerService) {
                        return beerService.getBeerList();
                    }
                }
			}
		}
	})
	
    .state('app.beer-profile', {
		url: '/recommended/:beerId',
		views: {
		  'menuContent': {
			templateUrl: 'templates/beer-profile.html',
			controller: 'BeerProfileCtrl',
            resolve: {
                beerProfile: function ($stateParams, beerService) {
                    return beerService.getBeerById($stateParams.beerId);
                }
            }
		  }
		}
    })

	.state('app.places', {
		url: '/places',
        cache: false, // Ionic caching discards foursquare results, so disable it.
		views: {
			'menuContent': {
				templateUrl: 'templates/places.html',
				controller: 'PlacesCtrl'
            } 
        } 
        
	})

    .state('app.places.list', {
        url: '/list',
        cache: false,
        templateUrl: 'templates/places.list.html',
        controller: 'PlacesListCtrl',
        resolve: {
            currentLocation: function(locationService) {
                return locationService.getLocation();
            }
        }
    })

    .state('app.places.loading', {
        url: '/loading',
        cache: false,
        templateUrl: 'templates/loading.html',
        controller: 'PlacesLoadCtrl'
    })

    .state('app.locationerror', {
        url: '/locationerror',
        views: {
			'menuContent': {
                templateUrl: 'templates/locationError.html',
                controller: 'ErrorCtrl'
            } 
        }
    })

    .state('app.networkerror', {
        url: '/networkerror',
        views: {
			'menuContent': {
                templateUrl: 'templates/networkError.html',
                controller: 'ErrorCtrl'
            } 
        }
    });

// If none of the above states are matched, use this as the fallback.
$urlRouterProvider.otherwise('/app/home');
});
