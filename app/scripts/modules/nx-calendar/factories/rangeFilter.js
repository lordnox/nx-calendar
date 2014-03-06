angular.module('nx-calendar').factory('nxRangeFilter', function(isEventInRangeFilter) {
  return function(start, end) {
    return function(event) {
      return isEventInRangeFilter(event, start, end);
    };
  };
});