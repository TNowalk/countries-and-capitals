describe('Service: utilityService', function() {
  beforeEach(module('myApp'));
  afterEach(function() {
    inject(function($httpBackend) {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });
  });

  describe('isNumber', function() {
    it('returns whether the argument is a number', inject(function(utilityService){
      expect(utilityService.isNumber('5')).toBeTruthy();
      expect(utilityService.isNumber('cheese')).toBeFalsy();
      expect(utilityService.isNumber('')).toBeFalsy();
      expect(utilityService.isNumber(' ')).toBeFalsy();
      expect(utilityService.isNumber(' 0.2')).toBeTruthy();
      expect(utilityService.isNumber('-7')).toBeTruthy();
    }));
  });
});