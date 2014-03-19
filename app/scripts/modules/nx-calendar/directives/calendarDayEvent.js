var app = angular.module('nx-calendar');

app.controller('nx-calendar-day-event-controller', function($scope, $element, $rootScope) {
    // Length of the visible day in minutes to calculate the percentage
  var minutes = ($scope.end - $scope.start) * 60
    // current day (for multi-day events important) set with the starting hour
    , day     = $scope.day.clone().hour($scope.start)
    // difference of the current days start to the events start, might be negative
    , top     = 100 * $scope.event.start.diff(day, 'minutes') / minutes
    , left    =  10 * ($scope.event.slot - 1)
    , height  = 100 * $scope.event.end.diff(day, 'minutes') / minutes
    , width   = 100 - 10 * ($scope.event.slot - 1)
  ;

  console.log(day.format('DD.'), $scope.event.title, '->', $scope.event.slot);

  /** Example: Day shows 7-15
   *  Event A from 6-8
   *  Event B from 10-12
   *  Event C from 14-18
   *    minutes = (15-7) * 60 = 480 (8 hours)
   *    day     = 7:00
   *      # for simplification we calculate in hours here,
   *      # the formulas run with minute precision
   *    A.top    = (6  - 7) / 8 * 100 = -12.5
   *    B.top    = (10 - 7) / 8 * 100 =  37.5
   *    C.top    = (14 - 7) / 8 * 100 =  87.5
   *
   *    A.height = (8  - 7) / 8 * 100 =  12.5
   *    B.height = (12 - 7) / 8 * 100 =  62.5
   *    C.height = (18 - 7) / 8 * 100 = 137.5
  **/

  // fix overflow and correct the height
  top     = Math.max(0  , top);
  height  = Math.min(100, height) - top;

  /**
   *    A.top    =   0.0
   *    B.top    =  37.5
   *    C.top    =  87.5
   *
   *    A.height =  12.5 -  0   = 12.5
   *    B.height =  62.5 - 37.5 = 25.0
   *    C.height = (100) - 87.5 = 12.5
  **/

  /**
   *  12.5 is equivalent to 1 hour as 15-7 is 8 and 100/8 is 12.5
   *  Which means that A will be shown as a 1 hour event,
   *  B as a 2 hour event and C, like A, as a 1 hour event.
  **/

  // apply all this css to the element with ng-style
  $scope.css = {
    top       : top + '%'
  , left      : left + '%'
  , minHeight : height + '%'
  , height    : height + '%'
  , maxHeight : (100 - top) + '%'
  , width     : width + '%'
  };

  // add eventhandlers to be applied when the user is hovering over one element.
  // also call $apply on the rootScope to let multiday-events know something happend
  // this "could" be performance heavy, as it will impact each scope on the page!
  $element
    .on('mouseenter', function() { $rootScope.$apply(function() { $scope.event.hovered = true; }); })
    .on('mouseleave', function() { $rootScope.$apply(function() { $scope.event.hovered = false; }); });
});

var directiveDefinition = function directiveDefinition(directive) {
  return function(nxCalendarConfiguration) {
    var template  = nxCalendarConfiguration.template;

    return {
      scope: {
        start : '=start'
      , end   : '=end'
      , day   : '=day'
      , event : '=' + directive
      },
      templateUrl : template('calendarDayEvent'),
      controller  : 'nx-calendar-day-event-controller'
    };
  };
};

['nxCalendarDayEvent', 'nxCalDayEvent'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});


