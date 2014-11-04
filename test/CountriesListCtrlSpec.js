describe("Controller: CountiresListCtrl", function(){
  beforeEach(module("myApp"));
  var CountriesListController, scope, httpBackend;

  var countries = "test";

  beforeEach(function() {

    module(function($provide) {
      $provide.value('countries', countries);
    });

    inject(function($rootScope, $controller, $httpBackend){
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      CountriesListController = $controller('CountriesListCtrl',{
        $scope: scope
      });
    });
  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });

  it("should instantiate the controller", function() {
    expect(CountriesListController).toBeDefined();
  });

  it("should resolve countries", function(){
    expect(CountriesListController.countries).toBe(countries);
  });
});