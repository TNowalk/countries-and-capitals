(function () {
  angular.module("myApp").animation(".my-fade-animation", myFadeAnimation);

  myFadeAnimation.$inject = [];

  function myFadeAnimation() {
    return {
      enter: function(element, done) {
        jQuery(element).css({
          opacity: 0
        });
        jQuery(element).animate({
          opacity: 1
        }, done);
      },

      leave: function(element, done) {
        jQuery(element).css({
          opacity: 1
        });
        jQuery(element).animate({
          opacity: 0
        }, done);
      }
    };
  }
})();