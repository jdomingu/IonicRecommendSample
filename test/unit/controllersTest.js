'use strict';

describe('Controllers Test', function () {


    beforeEach(module('hopulous'));

    describe('RecBeerCtrl', function () {
        var scope, ctrl, $httpBackend;

        // INJECT! 
        // $rootScope - injected to create a new scope instance.
        // $controller - injected to create an instance of our controller.
        // $q - injected so we can create promises for our mocks.
        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller, $q) {
            $httpBackend = _$httpBackend_;

            //Ionic loads all templates to cache them, which add extra get requests 
            //that we want to ignore. 
            $httpBackend.whenGET(/templates.*/)
                .respond(200, '');

            //When the service call is made, mock the json response.
            $httpBackend.expectGET('tmp/beer_history.json')
                .respond([{name: 'Cowiche Canyon'}, {name: 'Coors Light'}]);
 
            // create a scope object for us to use.
            scope = $rootScope.$new();
            
            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller("RecBeerCtrl", {
                $scope: scope
            });
        }));

        it("Recommended beer should match mocked json", function() {
            expect(scope.recbeers).toBeUndefined();
            $httpBackend.flush();
            expect(scope.recbeers).toEqual([{name: 'Cowiche Canyon'}, {name: 'Coors Light'}]);
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    }); 
});
                                                                                   
