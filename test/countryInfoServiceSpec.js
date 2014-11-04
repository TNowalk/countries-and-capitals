describe('Service: countryInfoService', function(){
  beforeEach(module('myApp'));

  var httpBackend;
  var countryInfo;

  beforeEach(function() {
    inject(function(countryInfoService, $httpBackend, $q){
      httpBackend = $httpBackend;
      countryInfo = countryInfoService;
    });
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });

  describe('getAllCountries', function(){
    it('should request and return a list of countries, or return cached results', function() {
      var fakeCountries = ['test1', 'test2'];
      var results;
      var errors;

      httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=srtucker22').respond(fakeCountries);
      countryInfo.getAllCountries().then(function(countries){
        results = countries;
      }, function(error) {
        errors = error;
      });
      httpBackend.flush();

      expect(results).toEqual(fakeCountries);
    });
  });

  describe('getCapital', function() {
    it('should return the capital of the country passed', function() {
      var fakeCountry = {
        countryCode: "AZ",
        capital: "cheese"
      };

      var fakeCapital = {
        geonames: [{fcode: 'PPLC', name: "cheese"}]
      };
      var results;
      var errors;

      httpBackend.expect('GET', 'http://api.geonames.org/searchJSON?q='+fakeCountry.capital+'&country='+fakeCountry.countryCode+'&name_equals='+fakeCountry.capital+'&isNameRequired=true&username=srtucker22').respond(fakeCapital);
      countryInfo.getCapital(fakeCountry).then(function(capital){
        results = capital;
      },
      function(error){
        errors = error;
      });
      httpBackend.flush();

      expect(results).toEqual(fakeCapital);
    });
  });

  describe('getCountry', function() {
    it('should return the country details for the passed countryCode', function() {
      var fakeCountryCode = "cheese";
    });
  });

  describe('getNeighbours', function() {
    it('should return the neighboring countries for the passed countryCode', function() {
      var fakeCountryCode = "cheese";
    });
  });

  describe('getTimeZone', function() {
    it('should return the timezone for the passed capital', function() {
      var fakeCapital = "cheese";
    });
  });
});