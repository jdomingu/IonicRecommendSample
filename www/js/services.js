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
                    // If this returns an error, display the locationerror view.
                    $state.go('app.locationerror');
                    deferred.reject(error);
                }, geoOptions);
                
                return deferred.promise;
            }
        },
        getFourSqUrl: function (currentLocation, query) {
            // Optimize results depending on whether or not there is a query.
            var queryOpts;
            if (query === '') {
                // Return food places and night spots within 500 meters
                queryOpts = 'search?categoryId=4d4b7105d754a06374d81259,4d4b7105d754a06376d81259&radius=500&';
            } else {
                // Search for venues within 5000 meters in all categories
                queryOpts = 'search?radius=5000&';
            }
            var fourSqUrl = 'https://api.foursquare.com/v2/venues/';
                fourSqUrl += queryOpts;
                fourSqUrl += 'client_id=RHHNFOL1ALHF14IYL4DR2FCWGLMC3ETVGKWWPPUI3ZKZVGG3&';
                fourSqUrl += 'client_secret=UH2M5F1HMULUIFLQPO1S2TWSQLJCUQXVAU1O2HPMLVSTCF3R&v=20150216&';
                fourSqUrl += 'll=' + currentLocation.latlon;
                fourSqUrl += '&limit=20&intent=checkin&';
                fourSqUrl += 'query=' + query;

            return fourSqUrl;
        }
    };
});

services.factory('networkService', function () {
    return {
        isNetworkEnabled: function () {
            if (navigator.network.connection.type == Connection.NONE){
                console.log('Could not access the network.');
                return false;
            } else {
                return true;
            }
        }
    };
});

services.factory('beerService', function ($http, $q) {
    return {
        beers: [{"beer_id":18,"beer_name":"Alchemy Ale","brewery":"Widmer Brothers Brewing","beer_style":"American Pale Ale","beer_rating":3.5,"brewery_country":"United States"},{"beer_id":73,"beer_name":"Cavatica Stout","brewery":"Fort George Brewery","beer_style":"American Stout","beer_rating":3.5,"brewery_country":"United States"},{"beer_id":278,"beer_name":"Northwest IPA","brewery":"Stoup Brewing","beer_style":"American IPA","beer_rating":3.0,"brewery_country":"United States"}],
        getBeerList: function () {
            var deferred = $q.defer();

            $http.get('tmp/hop_response.json').success(function(data) {
                this.beers = data.beers;
                deferred.resolve(this.beers);
            });

            return deferred.promise;
        },
        getBeerById: function (beerId) {
            var deferred = $q.defer();
            this.beers.forEach(function (beer) {
                //Improve this so that the loop stops when it finds the beer
                if (beer.beer_id == beerId) {
                    deferred.resolve(beer);
                    return;
                } 
            });

            return deferred.promise;
        }
    };
});


