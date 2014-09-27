(function(){
  angular.module('myApp').factory('countryInfoService', countryInfoService);

  countryInfoService.$inject = ['$http', '$interpolate','$log', '$q', 'GEO_API_PREFIX', 'GEO_API_SUFIX', 'GEO_COUNTRY_PATH', 'GEO_NEIGHBOURS_PATH', 'GEO_SEARCH_PATH', 'GEO_TIMEZONE_PATH'];

  function countryInfoService($http, $interpolate, $log, $q, GEO_API_PREFIX, GEO_API_SUFIX, GEO_COUNTRY_PATH, GEO_NEIGHBOURS_PATH, GEO_SEARCH_PATH, GEO_TIMEZONE_PATH){
    var allCountries = null;

    var service = {
      getAllCountries: getAllCountries,
      getCapital: getCapital,
      getCountry: getCountry,
      getNeighbours: getNeighbours,
      getTimeZone: getTimeZone
    };

    return service;

    ///////////////

    function geoRequest(path){
      var defer = $q.defer();
      $http.get(GEO_API_PREFIX + path + (path.substr(path.length-1) === '?'? '':'&') + GEO_API_SUFIX)
        .success(function(data){
          defer.resolve(data);
        })
        .error(function(data, status){
          defer.reject(status);
        });
      return defer.promise;
    }

    function getAllCountries(){
      var defer = $q.defer();
      if(allCountries){
        defer.resolve(allCountries);
      }else{
        geoRequest(GEO_COUNTRY_PATH).then(
          function(results){
            allCountries = results;
            defer.resolve(results);
          }, 
          function(error){
            defer.reject(error);
          }
        );
      }
      return defer.promise;
    }

    function getCapital(country){
      var defer = $q.defer();
      var path = $interpolate(GEO_SEARCH_PATH+'q={{capital}}&country={{country}}&name_equals={{capital}}&isNameRequired=true')({
        country: country.countryCode,
        capital: country.capital
      });
      geoRequest(path).then(
        function(results){
          if(results.totalResultsCount && results.totalResultsCount>0 && results.geonames){
            if(results.totalResultsCount===1){
              defer.resolve(results.geonames[0]);
            }else{
              var capital = _.findWhere(results.geonames, {fcode: "PPLC"});
              if(capital){
                defer.resolve(capital);
              }else{
                defer.reject("no results found");
              }
            }
          }else{
            defer.reject("no results found");
          }
        },
        function(error){
          defer.reject(error);
        }
      );
      return defer.promise;
    }

    function getCountry(countryCode){
      var path = $interpolate(GEO_COUNTRY_PATH+'country={{country}}')({
        country : countryCode
      });
      return geoRequest(path);
    }

    function getNeighbours(countryCode){
      var path = $interpolate(GEO_NEIGHBOURS_PATH+'country={{country}}')({
        country: countryCode
      });
      return geoRequest(path);
    }

    function getTimeZone(capital){
      var path = $interpolate(GEO_TIMEZONE_PATH+'lat={{lat}}&lng={{lng}}')({
        lat: capital.lat,
        lng: capital.lng
      });
      return geoRequest(path);
    }
  }
})();