angular.module('nx-calendar').factory('nxRangeFilterFactory', function(isEventInRangeFilter) {
  return function(start, end) {
    return function(event) {
      return isEventInRangeFilter(event, start, end);
    };
  };
});