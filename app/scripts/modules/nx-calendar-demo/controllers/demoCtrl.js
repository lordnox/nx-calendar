
var app = angular.module('nx-calendar-demo');

var data = {};

app.run(function(nxEventSource) {
  var date = new Date();
  var cid  = 10;
  var d    = date.getDate();
  var m    = date.getMonth();
  var y    = date.getFullYear();
  var day  = moment(new Date);
  var f    = "Do dddd";

  /* event source that pulls from google.com */
  data.eventSource = {
    url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
    className: 'gcal-event',           // an option!
    currentTimezone: 'America/Chicago' // an option!
  };

  var mkevt = function(t, d, h, l, m) {
    var start = day.clone().day(d).hour(h).minute(m||0);
    var end   = day.clone().day(d).hour(h+l).minute(m||0);
    console.log("day: ", d, h, l, m);
    console.log(start.format(f), end.format(f));
    return {
      id    : cid++
    , title : t
    , start : start
    , end   : end
    };
  };

  var d = 2;

  var e = mkevt('Long?!', 4, 4, 2);
  e.summary = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

  /* event source that contains custom events on the scope */
  data.events = [
    {title: 'All Day Event',start: new Date(y, m, 1)}
  // , {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)}
  // , {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false}
  // , {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false}
  // , {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false}
  // , {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
  // , mkevt('Monday'    , 1, 14, 4)
  // , mkevt('Tuesday'   , 2, 14, 2)
  // , mkevt('Wednesday' , 3, 14, 1)
  // , mkevt('Thursday'  , 4, 14, 2)
  , mkevt('Friday'    , 5, 14, 4)
  // , mkevt('Saturday'  , 6, 14, 2)
  // , mkevt('Sunday'    , 7, 14, 1)
  , mkevt('Friday 2'  , 5, 4, 25)
  // , e
  // , mkevt('demoday A', d, 6 , 2)
  // , mkevt('demoday B', d, 10, 2)
  // , mkevt('demoday C', d, 14, 4)
  ].map(function(item) {
    if(!item.end) {
      item.end   = moment(item.start).endOf('day');
      item.start = moment(item.start).startOf('day');
    }
    return {
      start   : moment(item.start),
      end     : moment(item.end),
      title   : item.title,
      id      : item.id || (item.id = cid++),
      summary : item.summary || (item.id + ' ---- ' + item.title)
    };
  });

  //data.events.map(nxEventSource.format);

  nxEventSource.register(data.events);
});

app.controller('demoCtrl', function($scope) {
  $scope.events       = data.events;
  $scope.eventSource  = data.eventSource;

  $scope.config = {
    week: {
      dayFormat: 'Do dddd',
      start: 7,
      end: 22,
      days: 7,
      day: moment().add(-1, 'days').day(1)
    },
    day: {
      start: 7,
      end: 15
    }
  };

  $scope.config.weekExtra = angular.copy($scope.config.week);
  $scope.config.weekExtra.days = 1;
  $scope.config.weekExtra.day.day(5);

  $scope.day = moment();//.day(5);

  $scope.prev = function() { $scope.day.add(-1, 'days'); };
  $scope.next = function() { $scope.day.add(+1, 'days'); };
  $scope.lowerStart   = function() { $scope.config.day.start--; $scope.config.day.start = Math.max(0, $scope.config.day.start); };
  $scope.higherStart  = function() { $scope.config.day.start++; $scope.config.day.start = Math.min(23, $scope.config.day.start); };
  $scope.lowerEnd     = function() { $scope.config.day.end--; $scope.config.day.end = Math.max(1, $scope.config.day.end); };
  $scope.higherEnd    = function() { $scope.config.day.end++; $scope.config.day.end = Math.min(24, $scope.config.day.end); };
});