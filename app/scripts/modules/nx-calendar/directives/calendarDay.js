var app = angular.module('nx-calendar');

app.controller('nx-calendar-day-controller', function($scope, nxCalendarUtilities) {
  $scope.timeFormat   = 'HH:mm';
  $scope.dayFormat    = 'dddd';
  $scope.weekFormat   = 'wo';
  $scope.hours = nxCalendarUtilities.range(7, 20, function(hour) {
    return moment().hour(hour).minute(0);
  });
  $scope.days = nxCalendarUtilities.range(7).map(function(day) {
    return {
      events: function() { return []; },
      moment: moment().day(day + 1)
    };
  });
  $scope.start = moment().startOf('day');
  $scope.end = moment().endOf('day');

  $scope.setTimeslot = function(start, end) {
    $scope.start = start;
    $scope.end = end;
  };
});


var directiveDefinition = function directiveDefinition() {
  return function(nxCalendarConfiguration) {
    var template = nxCalendarConfiguration.template;

    return {
      scope: {},
      controller: 'nx-calendar-day-controller',
      templateUrl: template('calendarDay'),
      // link: function(scope) {}
    };
  };
};

['nxCalendarDay', 'nxCalDay'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});


