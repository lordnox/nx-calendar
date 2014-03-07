var app = angular.module('nx-calendar')

  .filter('isEventBefore', function(toMomentFilter) {
    return function(evt, time) {
      return toMomentFilter(evt).end.isBefore(time || moment());
    };
  })

;
