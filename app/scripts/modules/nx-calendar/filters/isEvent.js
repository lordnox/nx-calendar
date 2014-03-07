var app = angular.module('nx-calendar')

  .filter('isEvent', function() {
    return function(evt) {
      if(!evt)
        return false;
      if(evt.hasOwnProperty('start') && evt.hasOwnProperty('end'))
        return evt.hasOwnProperty('summary');
      return false;
    };
  })

;
