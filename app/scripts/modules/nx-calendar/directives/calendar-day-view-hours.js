var app = angular.module('nx-calendar');

var nxCalendarDirective = function nxCalendarDayHoursDirective(directive) {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.view = 'dayHours';
      }],
      templateUrl: template('calendarDayHoursView'),
      link: function($scope, tElem, tAttrs) {
      }
    };
  }];
};

app.directive('nxCalendarDayHours', nxCalendarDirective('nxCalendarDayHours'));
app.directive('nxCalDayHours', nxCalendarDirective('nxCalDayHours'));


