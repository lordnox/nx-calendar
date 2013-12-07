var app = angular.module('nx-calendar');

var nxCalendarDirective = function nxCalendarEventsDirective(directive) {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.view = 'events';
      }],
      templateUrl: template('calendarEventsView'),
      link: function($scope, tElem, tAttrs) {
      }
    };
  }];
};

app.directive('nxCalendarEvents', nxCalendarDirective('nxCalendarEvents'));
app.directive('nxCalEvents', nxCalendarDirective('nxCalEvents'));


