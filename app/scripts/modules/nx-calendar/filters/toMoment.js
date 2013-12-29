var app = angular.module('nx-calendar')

  .filter('toMoment', function() {
    return function(evt) {
      if(!moment.isMoment(evt.start))
        evt.start = moment(evt.start);
      if(!moment.isMoment(evt.end))
        evt.end = moment(evt.end);
      return evt;
    }
  })

;
