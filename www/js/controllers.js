angular.module('hopulous.controllers', [])

.controller('RecBeerCtrl', function($scope, $http) {
    $http.get('tmp/beer_history.json').success(function(data) {
        $scope.recbeers = data.splice(0, 100); // Limit beers loaded for now. Remove splice later.
    });
});

//.controller('PlaylistCtrl', function($scope, $stateParams) {
//});
