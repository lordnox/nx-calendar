var app = angular.module('nx-calendar')

  .filter('isEventInRange', function(isEventBeforeFilter, isEventAfterFilter) {
    return function(evt, start, end) {
     return !isEventAfterFilter(evt, end) && !isEventBeforeFilter(evt, start);
    }
  })

;
