var app = angular.module('nx-calendar');

var nxCalendarDirective = function nxCalendarDayEventDirective(directive) {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.view = 'dayEvent';
      }],
      templateUrl: template('calendarDayEventView'),
      link: function($scope, tElem, tAttrs) {
      }
    };
  }];
};

app.directive('nxCalendarDayEvent', nxCalendarDirective('nxCalendarDayEvent'));
app.directive('nxCalDayEvent', nxCalendarDirective('nxCalDayEvent'));


