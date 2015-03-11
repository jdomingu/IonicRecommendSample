var controllers = angular.module('controllers', ['services']);

hopulous.controller('HomeCtrl', function($scope) {
});

hopulous.controller('RecBeerCtrl', function($scope, $http, beerList) {
    $scope.beers = beerList;

});

hopulous.controller('BeerProfileCtrl', function($scope, $stateParams, $http) {
	$http.get('tmp/' + $stateParams.beerId + '.json').success(function(data) {
		$scope.beerProfile = data;
    });
});

hopulous.controller('ErrorCtrl', function($scope, $state, $rootScope, $ionicHistory) {
    $scope.tryAgain = function () {
        $ionicHistory.goBack();
    };
});

// By default, child views are not initialized when you open the parent view.
// Show the loading view while the app gets location data.
hopulous.controller('PlacesCtrl', function($scope, $http, $state) {
    $state.go('app.places.loading');
});

// Start transitioning to the places list.The places list view will not be 
// displayed until the locationService finishes.
hopulous.controller('PlacesLoadCtrl', function($scope, $state, networkService) {
    // Test network early because geolocation is time-consuming 
    if (networkService.isNetworkEnabled()) {
        $state.go('app.places.list');
    } else {
        $state.go('app.networkerror');
    }
});

hopulous.controller('PlacesListCtrl', function($scope, $state, $http, currentLocation, locationService, networkService) {
    // Loading the places.list state returns the location after resolving a 
    // call to getLocation().
    $scope.currentLocation = currentLocation;

    // This is bound to the submit button in the search form.
    $scope.searchPlaces = function (query) {
        // Test network every time a search is performed
        if (!networkService.isNetworkEnabled()) {
            $state.go('app.networkerror');
        }
        var fourSqUrl = locationService.getFourSqUrl($scope.currentLocation, query);
        $http.get(fourSqUrl).success(function(data) {
            $scope.venues = data.response.venues;

            // Check if there are no results
            if ($scope.venues.length === 0) {
                $scope.message = 'No Results';
            }
        });

    };
    
    // On first load, pass an empty query to Foursquare.
    $scope.searchPlaces('');
    
});
