(function(){
  angular.module('myApp').factory('utilityService', utilityService);

  utilityService.$inject = ['$log'];

  function utilityService($log){
    var service = {
      isNumber: isNumber
    };
    return service;

    ///////////////

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  }

})();