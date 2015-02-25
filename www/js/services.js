var services = angular.module('services', []);

services.factory('locationService', function($q, $state) {
    return {
        isLocationEnabled: function () {
            if (!navigator.geolocation) {
                $state.go('app.places.locationError');
                return false;
            } else {
                return true;
            }
        },
        getLocation: function () {

            if (!this.isLocationEnabled()) {
                console.log('navigator.geolocation returned false');
                return;
            } else {
                var deferred = $q.defer();
                var geoOptions = {timeout:6000, enableHighAccuracy: true}; 

                navigator.geolocation.getCurrentPosition(function (position) {
                    deferred.resolve({latlon: position.coords.latitude + ', ' + position.coords.longitude});
                }, function (error) {
                    // If this returns an error, display the locationError view.
                    $state.go('app.places.locationError');
                    deferred.reject(error);
                }, geoOptions);
                
                return deferred.promise;
            }
        }
    };
});

services.factory('networkService', function () {
    return {
        isNetworkEnabled: function () {
            if (navigator.network.connection.type == Connection.NONE){
                console.log("Could not access the network.");
                return false;
            } else {
                return true;
            }
        }
    };
});
