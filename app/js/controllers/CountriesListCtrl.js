(function(){
  angular.module('myApp').controller('CountriesListCtrl', CountriesListCtrl);

  CountriesListCtrl.$inject = ['$log', 'countryInfoService', 'utilityService', 'countries'];

  function CountriesListCtrl($log, countryInfoService, utilityService, countries){
    var vm = this;
    vm.cols = [
      {title: 'Name', value: 'countryName'}, 
      {title: 'Country Code', value: 'countryCode'}, 
      {title: 'Area in km2', value: 'areaInSqKm'}, 
      {title: 'Population', value: 'population'}, 
      {title: 'Continent', value: 'continentName'}
    ];
    vm.countries = countries;
    vm.setOrder = setOrder;
    vm.showCountry = showCountry;

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