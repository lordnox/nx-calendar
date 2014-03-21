var app = angular.module('nx-calendar');

app.controller('nx-calendar-days-controller', function($scope, nxCalendarUtilities) {
  // update method to calculate the hours and days to view
  var updated   = false
    , defaults  = {
        start       : 0 // first hour of the day
      , end         : 24  // last hour of the day
      , timeFormat  : 'HH:mm'
      , dayFormat   : 'dddd'
      , weekFormat  : 'wo'
      , day         : moment() // can be set through scope.day or scope.config.day
      , days        : 1
      }
    , config    = {}
    , update    = function update() {

      updated     = true;
      config      = angular.extend(defaults, $scope.config || {});
      // create a clone for the dirty checking
      config.day  = moment(config.day).clone();

      // read all properties from the config
      $scope.start      = config.start;
      $scope.end        = config.end;
      $scope.timeFormat = config.timeFormat;
      $scope.dayFormat  = config.dayFormat;
      $scope.weekFormat = config.weekFormat;

      // build up the hours array for the ng-repeat
      $scope.hours = nxCalendarUtilities.range(config.start, config.end, function(hour) {
        return moment().hour(hour).minute(0);
      });

      // build up the days that are shown
      $scope.days = nxCalendarUtilities.range(config.days).map(function(day) {
        return config.day.clone().add(day, 'day').startOf('day');
      });
    }
  ;

  // day-watch to read out a possible day-config through the scope
  $scope.$watch(function() {
    // check for a moment object and compare the formats
    return moment.isMoment($scope.day)
        && $scope.day.isSame(config.day, 'day');
  }, function() {
    if(!moment.isMoment($scope.day)) return;
    config.day = moment($scope.day);
    update();
  });

  $scope.$watch(function() {
    return $scope.config && (
       ($scope.config.hasOwnProperty('start')       && $scope.config.start      !== config.start)
    || ($scope.config.hasOwnProperty('end')         && $scope.config.end        !== config.end)
    || ($scope.config.hasOwnProperty('timeFormat')  && $scope.config.timeFormat !== config.timeFormat)
    || ($scope.config.hasOwnProperty('dayFormat')   && $scope.config.dayFormat  !== config.dayFormat)
    || ($scope.config.hasOwnProperty('weekFormat')  && $scope.config.weekFormat !== config.weekFormat)
    ||(  $scope.config.hasOwnProperty('day')
      && moment.isMoment($scope.config.day)
      && config.day.isSame($scope.config.day)
      )
    );
  }, update);

  // run the update as initialization if it did not run through $watch
  if(!updated) update();
});

var directiveDefinition = function directiveDefinition() {
  return function(nxCalendarConfiguration) {
    var template  = nxCalendarConfiguration.template;

    return {
      scope: {
        config: '=nxCalConfig'
      , day:    '='
      },
      controller: 'nx-calendar-days-controller',
      templateUrl: template('calendarDays')
    };
  };
};

['nxCalendarDays', 'nxCalDays'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});


