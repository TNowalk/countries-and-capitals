(function(){
  angular.module('myApp').controller('CountryCtrl', CountryCtrl);

  CountryCtrl.$inject = ['$log', 'country', 'countryInfoService'];

  function CountryCtrl($log, country, countryInfoService){
    var vm = this;
    vm.country = country;
    vm.getCapital = getCapital;
    vm.getNeighbours = getNeighbours;
    vm.getTimeZone = getTimeZone;

    vm.getCapital(vm.country);
    vm.getNeighbours(vm.country.countryCode);

    function getCapital(country){
      countryInfoService.getCapital(country).then(
        function(results){
          vm.capital = results;
          vm.getTimeZone(vm.capital);
        },
        function(error){
          $log.log(error);
        }
      );
    }

    function getNeighbours(country){
      countryInfoService.getNeighbours(country).then(
        function(results){
          vm.country.neighbours = results;
        },
        function(error){
          $log.log(error);
        }
      );
    }

    function getTimeZone(country){
      countryInfoService.getTimeZone(country).then(
        function(results){
          vm.country.timezone = results;
        },
        function(error){
          $log.log(error);
        }
      );
    }
  }
})();