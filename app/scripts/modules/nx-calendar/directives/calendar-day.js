var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition(directive) {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {},
      controller: ['$scope', function($scope) {
      }],
      templateUrl: template('calendarDay'),
      link: function($scope, tElem, tAttrs) {
      }
    };
  }];
};

['nxCalendarDay', 'nxCalDay'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
})


