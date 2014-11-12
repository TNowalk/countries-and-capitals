describe('Controller: IndexCtrl', function(){
  beforeEach(module('myApp'));

  var httpBackend, IndexCtrl, scope;
  beforeEach(function() {
    inject(function($httpBackend, $controller, $rootScope){
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      IndexCtrl = $controller('IndexCtrl', {
        $scope: scope
      });
    });
  });

  afterEach(function(){
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });

  it('should instantiate the controller', function() {
    expect(IndexCtrl).toBeDefined();
  });
});