angular.module('nx-calendar')
  .filter('moment', function() {
    return function(date, format) {
      if(!format) return moment(date);
      return moment(date).format(format);
    };
  })

;
