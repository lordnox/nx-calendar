var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition() {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {},
      controller: function($scope) {
        $scope.timeFormat = 'HH:mm';
        $scope.dayFormat = 'dddd';
        $scope.weekFormat = 'wo';
        $scope.hours = utils.range(7, 20, function(hour) {
          return moment().hour(hour).minute(0);
        });
        $scope.days = utils.range(7).map(function(day) {
          return moment().day(day + 1);
        });
      },
      templateUrl: template('calendarDay')
    };
  }];
};

['nxCalendarDay', 'nxCalDay'].map(function(directive) {
  app.directive(directive, directiveDefinition());
});


