var services = angular.module('services', []);

services.factory('locationService', function($q) {

    return {
        isLocationEnabled: function () {
            if (!navigator.geolocation) {
                console.log('Location services are not available.');
                return false;
            } else {
                return true;
            }
        },
        getLocation: function () {

            if (!this.isLocationEnabled()) {
                console.log('Location services are off.');
                return;
            } else {
                var deferred = $q.defer();
                var geoOptions = {timeout:6000, enableHighAccuracy: true}; 

                navigator.geolocation.getCurrentPosition(function (position) {
                    deferred.resolve({latlon: position.coords.latitude + ', ' + position.coords.longitude});
                }, function (error) {
                    console.log('Error: ' + error);
                    deferred.reject(error);
                });
                
                return deferred.promise;
            }
        }
    };
});
