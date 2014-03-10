angular.module('nx-calendar').provider('nxCalendarUtilities', function() {
    var utils = {
      uuid: function() {
        // @TODO
        // replace by https://github.com/broofa/node-uuid/blob/master/uuid.js
        // @see http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        });
      }
    , range: function(from, to, fn) {
        if(!to || angular.isFunction(to)) {
          fn = to;
          to = from;
          from = 0;
        }
        fn = fn || angular.identity;
        var result = [];
        while(to > from) result.push(fn(from++));
        return result;
      }
    , sortByStartAndDuration: function(a, b) {
        return a.start.diff(b.start) || b.end.diff(b.start) - a.end.diff(a.start);
      }
    };

    return {
      $get: function() {
        return utils;
      },
      utils: utils
    };
  })
;
