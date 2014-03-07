angular.module('nx-calendar')

  .filter('isRange', function() {
    return function(range) {
      return range.hasOwnProperty('start')
          && range.hasOwnProperty('end')
          && moment.isMoment(range.start)
          && moment.isMoment(range.end)
      ;
    };
  })

;
