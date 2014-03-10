var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition(directive) {
  return function(nxCalendarConfiguration) {
    var template = nxCalendarConfiguration.template;

    return {
      scope: {
        config: '=' + directive + 'Config',
        source: '=' + directive
      },
      templateUrl: template('calendar'),
      link: function($scope, iElem, iAttrs) {
        $scope.view = iAttrs.view;
      }
    };
  };
};

['nxCalendar', 'nxCal'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});
