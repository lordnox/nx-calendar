var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition(d) {
  console.log(d);
  return function(nxCalendarConfiguration, nxCalendarUtilities) {
    var template = nxCalendarConfiguration.template;

    return {
      scope: {},
      controller: function($scope) {
        console.log($scope);
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
      },
      templateUrl: template('calendarDay')
    };
  };
};

['nxCalendarDay', 'nxCalDay'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});


