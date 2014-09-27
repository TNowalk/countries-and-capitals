(function(){
  angular.module('myApp').controller('CountriesListCtrl', CountriesListCtrl);

  CountriesListCtrl.$inject = ['$log', 'countryInfoService', 'utilityService'];

  function CountriesListCtrl($log, countryInfoService, utilityService){
    var vm = this;
    vm.cols = [
      {title: 'Name', value: 'countryName'}, 
      {title: 'Country Code', value: 'countryCode'}, 
      {title: 'Area in km2', value: 'areaInSqKm'}, 
      {title: 'Population', value: 'population'}, 
      {title: 'Continent', value: 'continentName'}
    ];
    vm.getAllCountries = getAllCountries;
    vm.isNumber = isNumber;
    vm.setOrder = setOrder;
    vm.showCountry = showCountry;

    vm.getAllCountries();

    function getAllCountries(){
      countryInfoService.getAllCountries().then(
        function(data){
          $log.log(data);
          vm.countries = data.geonames;
          // map the countries and convert all the number strings into floats
          vm.countries = _.map(vm.countries, function(country){
            return _.each(country, function(val, key, obj){
              if(isNumber(val)){
                obj[key] = parseFloat(val);
              }else{
                obj[key] = val;
              }
            });
          });
          $log.log(vm.countries);
        },
        function(error){
          $log.log(error);
        }
      );
    }

    function isNumber(arg){
      return utilityService.isNumber(arg);
    }

    function setOrder(col){
      if(vm.orderBy && vm.orderBy === col.value){
        vm.reverseOrder = !vm.reverseOrder;
      }else{
        vm.orderBy = col.value;
        vm.reverseOrder = false;
      }
    }

    function showCountry(country){
      document.location = '/#/countries/'+country.countryCode;
    }
  }

})();