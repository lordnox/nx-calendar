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
    };

    return {
      $get: function() {
        return utils;
      },
      utils: utils
    };
  })