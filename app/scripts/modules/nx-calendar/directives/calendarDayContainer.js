var app = angular.module('nx-calendar');

app.controller('nx-calendar-day-container-controller', function($scope, nxCalendarUtilities, nxEventSource) {

  $scope.events     = [];
  $scope.day        = $scope.day || moment();
  $scope.start      = +($scope.start || 0);
  $scope.end        = +($scope.end || 24);

  var filter = {
    start : $scope.day.clone().startOf('day'),
    end   : $scope.day.clone().endOf('day')
  };
  if($scope.source) filter.namespace = $scope.source;

  nxEventSource.subscribe($scope, null, filter, function($evt, data) {
    $scope.events = data.events;
  });
});


var directiveDefinition = function directiveDefinition() {
  return function(nxCalendarConfiguration) {
    var template  = nxCalendarConfiguration.template;

    return {
      scope: {
        day   : '=day'
      , end   : '=end'
      , start : '=start'
      , source: '=source'
      },
      controller: 'nx-calendar-day-container-controller',
      templateUrl: template('calendarDayContainer')
    };
  };
};

['nxCalendarDayContainer', 'nxCalDayContainer'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});


