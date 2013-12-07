var app = angular.module('nx-calendar');

var nxCalendarDirective = function nxCalendarDayWholeDirective(directive) {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.view = 'DayWhole';
      }],
      templateUrl: template('calendarDayWholeView'),
      link: function($scope, tElem, tAttrs) {
      }
    };
  }];
};

app.directive('nxCalendarDayWhole', nxCalendarDirective('nxCalendarDayWhole'));
app.directive('nxCalDayWhole', nxCalendarDirective('nxCalDayWhole'));


