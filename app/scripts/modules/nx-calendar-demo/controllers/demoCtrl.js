
var app = angular.module('nx-calendar-demo');

var data = {};

app.run(function() {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  /* event source that pulls from google.com */
  data.eventSource = {
          url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
          className: 'gcal-event',           // an option!
          currentTimezone: 'America/Chicago' // an option!
  };
  /* event source that contains custom events on the scope */
  data.events = [
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
  ];
});

app.controller('demoCtrl', function($scope) {
  $scope.events = data.events;
  $scope.eventSource = data.eventSource;
});