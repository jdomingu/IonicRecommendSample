angular.module('hopulous', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('RecBeerCtrl', function($scope) {
  $scope.recbeers = [
    { name: 'Cowiche Canyon',
        brewery: 'Fremont Brewing' },
    { name: 'Space Dust', 
        brewery: 'Elysian Brewing' },
    { name: 'Boneyard RPM',
        brewery: 'Boneyard Brewing' },
  ];
});

