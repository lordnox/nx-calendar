var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition(directive) {
  return ['nxCalendarConfiguration', 'nxCalendarUtilities', function(configuration, utils) {
    var template = configuration.template;

    return {
      scope: {},
      controller: ['$scope', function($scope) {
      }],
      templateUrl: template('calendarMonth'),
      link: function($scope, tElem, tAttrs) {
      }
    };
  }];
};

['nxCalendarMonth', 'nxCalMonth'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
})


