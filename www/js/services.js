var services = angular.module('services', []);

services.factory('locationService', function($q) {
    var defer = $q.defer;

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
                return;
            } else {
                navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
                return defer.promise;
                    // var defer = $q.defer();

                    // defer.promise
                    //     .then(function (gpsCoords) {
                    //         alert(gpsCoords);
                    //     });

                    // var gpsCoords = navigator.geolocation.getCurrentPosition(onGpsSuccess, onGpsFail);
                    // $timeout(function (gpsCoords) {
                    //     alert(gpsCoords);
                    //     defer.resolve(gpsCoords);
                    // }, 8000);
            }
        },

        locationSuccess: function (position) {
            alert(position.coords.latitude + ', ' + position.coords.longitude);
            defer.resolve(position.coords.latitude + ', ' + position.coords.longitude);
        },

        locationError: function (error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
            defer.reject('Error');
        }

    };
});
