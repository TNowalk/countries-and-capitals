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
    it('should return an error', function() {
      var error;
      var results;

      httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=srtucker22').respond(500, 'error');
      countryInfo.getAllCountries().then(function(countries){
        results = countries;
      }, function(e){
        error = e;
      });
      httpBackend.flush();

      expect(results).not.toBeDefined();
      expect(error).toBeDefined();
    });

    it('should request and return a list of countries, or return cached results', function() {
      var fakeCountries = ['test1', 'test2'];
      var results;
      var error;

      httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=srtucker22').respond(fakeCountries);
      countryInfo.getAllCountries().then(function(countries){
        results = countries;
      }, function(e) {
        error = e;
      });
      httpBackend.flush();

      expect(error).not.toBeDefined();
      expect(results).toEqual(fakeCountries);

      var status = false;
      countryInfo.getAllCountries().then(function(countries){
        console.log('wtf');
        status = true;
      }, function(e){
        error = e;
      });

      expect(error).not.toBeDefined();
      expect(status).toBeTruthy();
    });
  });

  describe('getCapital', function() {
    var testGetCapital = function(fakeCountry, fakeCapital, fakeResults) {
      var result, error;

      httpBackend.expect('GET', 'http://api.geonames.org/searchJSON?q='+fakeCountry.capital+'&country='+fakeCountry.countryCode+'&name_equals='+fakeCountry.capital+'&isNameRequired=true&username=srtucker22').respond(fakeResults);
      countryInfo.getCapital(fakeCountry).then(function(capital){
        result = capital;
      },
      function(e){
        error = e;
      });
      httpBackend.flush();
      return {error: error, result: result};
    };

    it('should return the capital of the country passed', function() {
      // test with ideal results
      var fakeCountry = {
        countryCode: "AZ",
        capital: "cheese"
      };
      var fakeCapital = {fcode: 'PPLC', name: "cheese"};
      var fakeResults = {
        totalResultsCount: 1,
        geonames: [fakeCapital]
      };    

      var returns = testGetCapital(fakeCountry, fakeCapital, fakeResults);

      expect(returns.error).not.toBeDefined();
      expect(returns.result).toEqual(fakeCapital);
    });

    it('should return the proper capital of the country passed', function() {
      // test with multiple return results
      var fakeCountry = {
        countryCode: "AZ",
        capital: "cheese"
      };
      var fakeCapital = {fcode: 'PPLC', name: "cheese"};
      fakeResults = {
        totalResultsCount: 2,
        geonames: ['poop', fakeCapital]
      };    

      var returns = testGetCapital(fakeCountry, fakeCapital, fakeResults);

      expect(returns.error).not.toBeDefined();
      expect(returns.result).toEqual(fakeCapital);
    });

    it('should return an error', function() {
      // test with bad input
      fakeCountry = {
        countryCode: "AZ",
        capital: "cheese"
      };
      fakeCapital = {fcode: 'PPLC', name: "cheese"};
      fakeResults = {
        geonames: [fakeCapital, 'poop']
      };    

      var returns = testGetCapital(fakeCountry, fakeCapital, fakeResults);
      expect(returns.error).toBeDefined();
      expect(returns.result).not.toBeDefined();
    });

    it('should return an error for no capital', function() {
      // test with bad input
      fakeCountry = {
        countryCode: "AZ",
        capital: "cheese"
      };
      fakeCapital = {name: "cheese"};
      fakeResults = {
        totalResultsCount: 2,
        geonames: ['poop', fakeCapital]
      };    

      var returns = testGetCapital(fakeCountry, fakeCapital, fakeResults);
      expect(returns.error).toBeDefined();
      expect(returns.result).not.toBeDefined();
    });

    it('should return an error right away', function() {
      // test with bad input
      fakeCountry = {
        countryCode: "AZ",
        capital: "cheese"
      };
      fakeCapital = {name: "cheese"};
      fakeResults = {
        totalResultsCount: 2,
        geonames: ['poop', fakeCapital]
      };    

      var error, result;

      httpBackend.expect('GET', 'http://api.geonames.org/searchJSON?q='+fakeCountry.capital+'&country='+fakeCountry.countryCode+'&name_equals='+fakeCountry.capital+'&isNameRequired=true&username=srtucker22').respond(500, 'error');
      countryInfo.getCapital(fakeCountry).then(function(capital){
        result = capital;
      },
      function(e){
        error = e;
      });

      httpBackend.flush();
      expect(error).toBeDefined();
      expect(result).not.toBeDefined();
    });
  });

  describe('getCountry', function() {
    it('should return the country details for the passed countryCode', function() {
      httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?country=cheese&username=srtucker22').respond(200);
      
      var result;

      var fakeCountryCode = "cheese";
      var status = false;
      countryInfo.getCountry(fakeCountryCode).then(function() {
          status = true;
      });
      httpBackend.flush();
      expect(status).toBeTruthy();
    });
  });

  describe('getNeighbours', function() {
    it('should return the neighboring countries for the passed countryCode', function() {
      httpBackend.expect('GET', 'http://api.geonames.org/neighboursJSON?country=cheese&username=srtucker22').respond(200);
      
      var result;

      var fakeCountryCode = "cheese";
      var status = false;
      countryInfo.getNeighbours(fakeCountryCode).then(function() {
          status = true;
      });
      httpBackend.flush();
      expect(status).toBeTruthy();
    });
  });

  describe('getTimeZone', function() {
    it('should return the timezone for the passed capital', function() {
      httpBackend.expect('GET', 'http://api.geonames.org/timezoneJSON?lat=&lng=&username=srtucker22').respond(200);
      
      var result;

      var fakeCapital = "cheese";
      var status = false;
      countryInfo.getTimeZone(fakeCapital).then(function() {
          status = true;
      });
      httpBackend.flush();
      expect(status).toBeTruthy();
    });
  });
});