'use strict';

angular.module('app')
  .controller('AppCtrl', ['$scope', '$http', '$window', '$rootScope',
    function(              $scope, $http, $window, $rootScope) {
      
      $scope.app = {
        name: 'Angulr',
        version: '1.3.2'
      };
  
      $scope.message = 'Everyone come and see how good I look!';


      $rootScope.host = 'http://127.0.0.1:3000';
      //$rootScope.host = 'http://112.219.140.178:3000';
      
  }]);


var app = angular.module('app');

app.config(function($routeProvider, $httpProvider) {
  //$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
  
  $routeProvider

  // route for the home page
    .when('/', {
      templateUrl : '/tpl/home.html',
      controller  : 'mainCtrl'
    })
  // route for the about page
    .when('/v/:parent/:child/:id/:uid', {
      templateUrl : '/tpl/v.html',
      controller  : 'vCtrl'
    })

    .otherwise({redirectTo: '/'});

});
