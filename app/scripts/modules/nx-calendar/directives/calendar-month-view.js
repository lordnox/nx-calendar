var app = angular.module('nx-calendar');

var nxCalendarDirective = function nxCalendarMonthDirective(directive) {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.view = 'month';
      }],
      templateUrl: template('calendarMonthView'),
      link: function($scope, tElem, tAttrs) {
      }
    };
  }];
};

app.directive('nxCalendarMonth', nxCalendarDirective('nxCalendarMonth'));
app.directive('nxCalMonth', nxCalendarDirective('nxCalMonth'));


