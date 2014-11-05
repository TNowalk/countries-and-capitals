describe('Controller: HomeCtrl', function(){
  beforeEach(module('myApp'));
  
  var httpBackend, scope, HomeCtrl;
  beforeEach(function() {
    inject(function($httpBackend, $rootScope, $controller) {
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      HomeCtrl = $controller('HomeCtrl', {
        $scope: scope
      });
    });
  });

  afterEach(function(){
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });

  it("should instantiate the controller", function(){
    expect(HomeCtrl).toBeDefined();
  });
});