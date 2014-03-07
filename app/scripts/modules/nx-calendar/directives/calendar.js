var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition(directive) {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {
        config: "=" + directive + "Config",
        source: "=" + directive
      },
      controller: ['$scope', function($scope) {
      }],
      templateUrl: template('calendar'),
      link: function($scope, iElem, iAttrs) {
        $scope.view = iAttrs.view;
      }
    };
  }];
};

['nxCalendar', 'nxCal'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
})
