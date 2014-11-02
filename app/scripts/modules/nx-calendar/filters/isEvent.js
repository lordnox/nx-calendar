var app = angular.module('nx-calendar')

  .filter('isEvent', function() {
    return function(evt) {
      return !!evt
          && evt.hasOwnProperty('start')
          && evt.hasOwnProperty('end')
          && evt.hasOwnProperty('summary')
        ;
    };
  })

;
