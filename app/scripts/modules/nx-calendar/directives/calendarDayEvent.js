var app = angular.module('nx-calendar');

app.controller('nx-calendar-day-event-controller', function($scope) {
  var minutes = ($scope.end - $scope.start) * 60
    , day     = $scope.day.clone().hour($scope.start);

  $scope.position = {
    top   : 100 * $scope.event.start.diff(day, 'minutes') / minutes
  , left  :  10 * ($scope.event.slot - 1)
  , height: 100 * $scope.event.end.diff($scope.event.start, 'minutes') / minutes
  , width : 100 - 10 * ($scope.event.slot - 1)
  };

  $scope.position.top     = Math.max(0  , $scope.position.top); // at least 0%
  $scope.position.height  = Math.min(100, $scope.position.height);
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


