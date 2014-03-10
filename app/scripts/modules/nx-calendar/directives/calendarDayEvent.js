var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition(directive) {
  return function(nxCalendarConfiguration) {
    var template  = nxCalendarConfiguration.template;

    return {
      scope: {
        start : '=start'
      , end   : '=end'
      , event : '=' + directive
      , slot  : '=slot'
      },
      templateUrl: template('calendarDayEvent')
    };
  };
};

['nxCalendarDayEvent', 'nxCalDayEvent'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});


