var app = angular.module('nx-calendar')

  .filter('isEventBefore', function() {
    return function(evt) {
      return false;
    }
  })

;
