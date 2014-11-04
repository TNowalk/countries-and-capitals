describe("Module: myApp", function(){
  beforeEach(module('myApp'));

  var mockCountryInfoService = {};
  var mockUtilityService = {};
  var httpBackend, location, route, rootScope;

  var fakeCountry = {
    geonames: ['cheese'],
    number: 4
  };

  var fakeCountries = {
    geonames: [fakeCountry, fakeCountry]
  };

  beforeEach(function(){
    module(function($provide) {
      $provide.value('countryInfoService', mockCountryInfoService);
      $provide.value('utilityService', mockUtilityService);
    });

    inject(function($location, $rootScope, $route, $httpBackend, $q) {
      httpBackend = $httpBackend;
      rootScope = $rootScope;
      route = $route;
      location = $location;

      mockUtilityService.isNumber = function(val){
        return true;
      };

      var defer = $q.defer();
      mockCountryInfoService.getAllCountries = function() {
        defer.resolve(fakeCountries);
        return defer.promise;
      };
      mockCountryInfoService.getCountry = function(country) {
        if(country === 'cheese'){
          defer.resolve(fakeCountry);
        }else{
          defer.reject();
        }
        return defer.promise;
      };
    });
  });

  afterEach(function(){
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });

  describe("/ route", function() {
    it("should load the template, controller", function(){
      httpBackend.whenGET('./templates/home.html').respond('...');
      
      location.path('/');
      httpBackend.flush();

      expect(route.current.controller).toBe('HomeCtrl');
      expect(route.current.loadedTemplateUrl).toBe('./templates/home.html');
    });
  });

  describe("/countries route", function() {
    it("should load the template, controller, and resolve countries", function(){
      httpBackend.whenGET('./templates/countries-list.html').respond('...');

      location.path('/countries');
      httpBackend.flush();

      expect(route.current.controller).toBe('CountriesListCtrl');
      expect(route.current.loadedTemplateUrl).toBe('./templates/countries-list.html');
    });
  });

  describe("/countries/:country route", function(){
    it("should load the template, controller, and resolve", function(){
      httpBackend.whenGET('./templates/country.html').respond('...');

      location.path('/countries/cheese');
      httpBackend.flush();

      expect(location.current.controller).toBe('CountryCtrl');
      expect(location.current.loadedTemplateUrl).toBe('./templates/country.html');
    });
  });

});