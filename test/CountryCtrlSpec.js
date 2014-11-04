describe("Controller: CountryCtrl", function(){
  beforeEach(module("myApp"));

  var httpBackend, scope;
  var CountryCtrl;
  var country = "test";
  var mockCountryInfoService = {};

  beforeEach(function() {
    module(function($provide) {
      $provide.value('country', country);
      $provide.value('countryInfoService', mockCountryInfoService);
    });

    inject(function($rootScope, $httpBackend, $controller, $q) {
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      mockCountryInfoService.getCapital = function(value) {
        var defer = $q.defer();
        defer.resolve(value);
        return defer.promise;
      };
      mockCountryInfoService.getNeighbours = function(value) {
        var defer = $q.defer();
        defer.resolve(value);
        return defer.promise;
      };
      mockCountryInfoService.getTimeZone = function(value) {
        var defer = $q.defer();
        defer.resolve(value);
        return defer.promise;
      };

      CountryCtrl = $controller('CountryCtrl', {
        $scope: scope,
        countryInfoService: mockCountryInfoService
      });
    });
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });

  it("instantiates the controller", function() {
    expect(CountryCtrl).toBeDefined();
  });

  it("resolves a country", function() {
    expect(CountryCtrl.country).toBe(country);
  });

  it("activates the controller by getting the capital, neighbors, and timeone", function() {
    // how to do this?!
  });
});