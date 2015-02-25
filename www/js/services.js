var services = angular.module('services', []);

services.factory('locationService', function($q) {

    return {
        isLocationEnabled: function () {
            if (!navigator.geolocation) {
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
                    console.log('Error ' + error.code + ': ' + error.message);
                    alert('Could not get your location. Ensure that location services are turned on.');
                    deferred.reject(error);
                }, geoOptions);
                
                return deferred.promise;
            }
        }
    };
});

