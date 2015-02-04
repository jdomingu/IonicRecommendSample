angular.module('hopulous', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('RecBeerCtrl', function($scope, $http) {
    $http.get('tmp/beer_history.json').success(function(data) {
        $scope.recbeers = data.splice(0, 100); // Limit beers loaded for now. Remove splice later.
    });
});

angular.module('hopulous', ['ionic', 'hopulous.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
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
	


// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/app/recommended');
});
