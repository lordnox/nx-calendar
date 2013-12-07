var app = angular.module('nx-calendar');

var nxCalendarDirective = function nxCalendarDirective(directive) {
  return ['nxCalendarConfiguration', function(configuration) {
    var template = configuration.template;

    return {
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.view = 'day';
      }],
      templateUrl: template('calendar'),
      link: function($scope, tElem, tAttrs) {
      }
    };
  }];
};

app.directive('nxCalendar', nxCalendarDirective('nxCalendar'));
app.directive('nxCal', nxCalendarDirective('nxCal'));


