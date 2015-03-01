var controllers = angular.module('controllers', ['services']);

hopulous.controller('RecBeerCtrl', function($scope, $http) {
    $http.get('tmp/beer_history.json').success(function(data) {
        $scope.recbeers = data;
    });
});

hopulous.controller('BeerProfileCtrl', function($scope, $stateParams, $http) {
	$http.get('tmp/' + $stateParams.beerId + '.json').success(function(data) {
		$scope.beerProfile = data;
    });
});

hopulous.controller('ErrorCtrl', function($scope) {
});

// By default, child views are not initialized when you open the parent view.
// Show the loading view while the app gets location data.
hopulous.controller('PlacesCtrl', function($scope, $http, $state) {
    $state.go('app.places.loading');
});

// If there is no network connection display an error. Otherwise, start 
// transitioning to the places list.The places list view will not be 
// displayed until the locationService finishes.
hopulous.controller('PlacesLoadCtrl', function($scope, $state, errorOrFoursquare) {
    $scope.errorOrFoursquare = errorOrFoursquare;
    $state.go(errorOrFoursquare);
});

hopulous.controller('PlacesListCtrl', function($scope, $http, currentLocation, locationService) {
    // Loading the places.list state returns the location after resolving a 
    // call to getLocation().
    $scope.currentLocation = currentLocation;

    // This is bound to the submit button in the search form.
    $scope.searchPlaces = function (query) {
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
