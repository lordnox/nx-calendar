var app = angular.module('nx-calendar')

  .filter('isEventAfter', function(toMomentFilter) {
    return function(evt, time) {
      return toMomentFilter(evt).start.isAfter(time || moment());
    };
  })

;
