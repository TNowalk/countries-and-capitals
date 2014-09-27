(function(){
  angular.module('myApp')
  .constant('GEO_API_PREFIX', 'http://api.geonames.org')
  .constant('GEO_API_SUFIX', 'username=srtucker22')
  .constant('GEO_COUNTRY_PATH', '/countryInfoJSON?')
  .constant('GEO_NEIGHBOURS_PATH', '/neighboursJSON?')
  .constant('GEO_SEARCH_PATH', '/searchJSON?')
  .constant('GEO_TIMEZONE_PATH', '/timezoneJSON?');
})();