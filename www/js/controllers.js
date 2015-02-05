angular.module('hopulous.controllers', [])

.controller('RecBeerCtrl', function($scope, $http) {
    $http.get('tmp/beer_history.json').success(function(data) {
        $scope.recbeers = data;
    });
})

.controller('BeerProfileCtrl', function($scope, $stateParams, $http) {
	$http.get('tmp/' + $stateParams.beerId + '.json').success(function(data) {
		$scope.beerProfile = data;
    });
});
