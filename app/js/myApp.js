(function(){
  'use strict';
  
  angular.module('myApp', ['ngRoute', 'ngAnimate'])

  .run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.isLoading = false;
    });
  })

  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl : './templates/home.html',
      controller : 'HomeCtrl as homectrl'
    })
    .when('/countries', {
      templateUrl: './templates/countries-list.html',
      controller : 'CountriesListCtrl as countrieslistctrl'
    })
    .when('/countries/:country', {
      templateUrl: './templates/country.html',
      controller: 'CountryCtrl as countryctrl',
      resolve: {
        country: function($route, $location, $log, countryInfoService){
          var country = $route.current.params.country;
          return countryInfoService.getCountry(country).then(
            function(results){
              if(results.geonames && results.geonames.length>0){
                return results.geonames[0];
              }else{
                $location.path('/error');
                return;
              }
            }, 
            function(error){
              $location.path('/error');
              return;
            }
          );
        }
      }
    })
    .when('/error', {
      templateUrl: './templates/error.html'
    })
    .otherwise({
      redirectTo: '/error'
    });
  }); 

})();
