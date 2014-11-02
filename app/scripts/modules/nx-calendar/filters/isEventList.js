var app = angular.module('nx-calendar')

  .filter('isEventList', function(isEventFilter) {
    return function(list) {
      return angular.isArray(list)
          && list.filter(isEventFilter).length === list.length;
    };
  })

;
