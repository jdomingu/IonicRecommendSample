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

hopulous.controller('PlacesListCtrl', function($scope, $http, currentLocation) {
    // Loading the places.list state returns the location after resolving a 
    // call to getLocation().
    $scope.currentLocation = currentLocation;

    $scope.searchPlaces = function (placesQuery) {
        $scope.placesQuery = placesQuery;
        
    };
    
    var foursquareUrl = 'https://api.foursquare.com/v2/venues/search?client_id=RHHNFOL1ALHF14IYL4DR2FCWGLMC3ETVGKWWPPUI3ZKZVGG3&client_secret=UH2M5F1HMULUIFLQPO1S2TWSQLJCUQXVAU1O2HPMLVSTCF3R&v=20150216&categoryId=4d4b7104d754a06370d81259,4d4b7105d754a06373d81259,4d4b7105d754a06374d81259,4d4b7105d754a06376d81259,4bf58dd8d48988d1f9941735&ll=' + currentLocation.latlon + '&limit=20&radius=1000&query=';
    $http.get(foursquareUrl).success(function(data) {
        $scope.venues = data.response.venues;
    });
});
