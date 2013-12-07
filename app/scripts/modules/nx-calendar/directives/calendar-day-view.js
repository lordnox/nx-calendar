var app = angular.module('nx-calendar');

var nxCalendarDirective = function nxCalendarDayDirective(directive) {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.view = 'day';
      }],
      templateUrl: template('calendarDayView'),
      link: function($scope, tElem, tAttrs) {
      }
    };
  }];
};

app.directive('nxCalendarDay', nxCalendarDirective('nxCalendarDay'));
app.directive('nxCalDay', nxCalendarDirective('nxCalDay'));


