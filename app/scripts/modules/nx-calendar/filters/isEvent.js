var app = angular.module('nx-calendar')

  .filter('isEvent', function() {
    return function(evt) {
      return false;
    }
  })

;
