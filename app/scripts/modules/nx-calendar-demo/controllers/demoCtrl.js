
var app = angular.module('nx-calendar-demo');

var data = {};

app.run(function(nxEventSource) {
  var date = new Date();
  var cid = 10;
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  var day = moment(new Date);

  /* event source that pulls from google.com */
  data.eventSource = {
    url: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic',
    className: 'gcal-event',           // an option!
    currentTimezone: 'America/Chicago' // an option!
  };

  var mkevt = function(t, d, h, l, m) {
    //console.log("day: ", d, h, l, m);
    return {
      id    : cid++
    , title : t
    , start : day.clone().day(d).hour(h).minute(m||0)
    , end   : day.clone().day(d).hour(h+l).minute(m||0)
    };
  };

  /* event source that contains custom events on the scope */
  data.events = [
    {title: 'All Day Event',start: new Date(y, m, 1)}
  , {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)}
  , {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false}
  , {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false}
  , {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false}
  , {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
  , mkevt('Monday'    , 1, 14, 1)
  , mkevt('Tuesday'   , 2, 14, 1)
  , mkevt('Wednesday' , 3, 14, 1)
  , mkevt('Thursday'  , 4, 14, 1)
  , mkevt('Friday'    , 5, 14, 1)
  , mkevt('Saturday'  , 6, 14, 1)
  , mkevt('Sunday'    , 7, 14, 1)
  , mkevt('Friday 2'  , 5, 14, 1)
  ].map(function(item) {
    return {
      start: moment(item.start),
      end: moment(item.end),
      title: item.title,
      id: item.id || (item.id = cid++),
      summary: item.id + ' ---- ' + item.title
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
      days: 7,
      day: moment().add(-1, 'days').day(1)
    },
    day: {
      start: 7,
      end: 22
    }
  };
});