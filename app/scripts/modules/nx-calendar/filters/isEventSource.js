var app = angular.module('nx-calendar')

  .filter('isEventSource', function() {
    return function(source) {
      return false;
    }
  })

;
