var app = angular.module('nx-calendar')

  .filter('isEventList', function() {
    return function(list) {
      return angular.isArray(list);
    }
  })

;
