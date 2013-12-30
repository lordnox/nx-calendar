var app = angular.module('nx-calendar')

  .filter('isRange', function() {
    return function(range) {
     return  range.hasOwnProperty('start')
          && moment.isMoment(range.start)
          && range.hasOwnProperty('end')
          && moment.isMoment(range.end)
          ;
    };
  })

;
