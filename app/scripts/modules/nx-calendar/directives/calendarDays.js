var app = angular.module('nx-calendar');

app.controller('nx-calendar-days-controller', function($scope, nxCalendarUtilities, nxEventSource) {

  var config = angular.extend({
    start       : 0 // first hour of the day
  , end         : 24  // last hour of the day
  , timeFormat  : 'HH:mm'
  , dayFormat   : 'dddd'
  , weekFormat  : 'wo'
  , day         : moment()
  , days        : 1
  }, $scope.config || {});

  config.day = moment(config.day);

  $scope.timeFormat = config.timeFormat;
  $scope.dayFormat  = config.dayFormat;
  $scope.weekFormat = config.weekFormat;
  $scope.events     = [];

  $scope.hours = nxCalendarUtilities.range(config.start, config.end, function(hour) {
    return moment().hour(hour).minute(0);
  });

  $scope.days = nxCalendarUtilities.range(config.days).map(function(day) {
    return config.day.clone().add(day, 'day').startOf('day');
  });

  var filter = {
    start : $scope.days[0],
    end   : $scope.days[$scope.days.length - 1].clone().endOf('day')
  };
  if(config.source) filter.namespace = config.source;


  nxEventSource.subscribe($scope, null, filter, function($evt, data) {
    $scope.events = data.events;
    console.log('nxEventSource - Events');
    $scope.events.map(function(evt) {
      console.log(nxEventSource.format(evt))
    });
  });
});


var directiveDefinition = function directiveDefinition() {
  return function(nxCalendarConfiguration) {
    var template  = nxCalendarConfiguration.template;

    return {
      scope: {
        config: '=nxCalConfig'
      },
      controller: 'nx-calendar-days-controller',
      templateUrl: template('calendarDays')
    };
  };
};

['nxCalendarDays', 'nxCalDays'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});


