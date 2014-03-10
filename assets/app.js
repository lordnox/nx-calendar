angular.module('configuration', [])
  .provider('config', function() {


    var appVersion = 8;


    var templatePath = ['scripts', 'modules'];
    var templateDirectory = 'templates';
    var templateSuffix = '.html' + "?v=" + appVersion;
    var abstractTemplate = '<ui-view/>';


    var config = {

      version : appVersion,

      routing : {
        prefix : '',
        html5Mode : true,
        default: "/"
      },

      template: function(module) {
        var templateBase = templatePath.concat([module]).concat([templateDirectory])
        var tplFn = function(path) {
          return templateBase.concat(Array.prototype.slice.call(arguments)).join('/') + templateSuffix;
        };
        tplFn.abstract = abstractTemplate;
        return tplFn;
      }
    };

    config.template.abstract = abstractTemplate;

    return {
      $get: function() {
        return config;
      },
      prepareModuleTemplateUrl: config.prepareModuleTemplateUrl,
      prepareViewTemplateUrl: config.prepareViewTemplateUrl,
      template: config.template,
      set: function(key, value) {
        config[key] = value;
      },
      config: config
    };
  })
;
;var app = angular.module('nx-calendar-demo', [
  'ui.router',
  'configuration',
  'nx-calendar'
])

  .config(function ($stateProvider, configProvider, nxCalendarConfigurationProvider) {

    var template = configProvider.template('nx-calendar-demo');

    /**
     *    Define an abstract state that itself defines the navigation element and a container for the
     *    sub-states
     **/
    $stateProvider
      .state('calendar', {
        abstract: true,
        views: {
          '@': {
            template: template.abstract,
          },
          navigation: {
            templateUrl: template('navigation')
          }
        }
      })
      .state('calendar.month', {
        url: '/month',
        templateUrl: template('month'),
        controller: 'demoCtrl'
      })
      .state('calendar.week', {
        url: '/week',
        templateUrl: template('week'),
        controller: 'demoCtrl'
      })
      .state('calendar.day', {
        url: '/day',
        templateUrl: template('day'),
        controller: 'demoCtrl'
      })
      .state('calendar.events', {
        url: '/events',
        templateUrl: template('events'),
        controller: 'demoCtrl'
      })
      .state('calendar.settings', {
        url: '/settings',
        templateUrl: template('settings'),
        controller: 'demoCtrl'
      })
  })

;


;angular.module('nx-calendar', [
  'configuration'
]);


;
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


  var e = mkevt('Long?!' , 3, 4, 2);
  e.summary = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

  /* event source that contains custom events on the scope */
  data.events = [
    {title: 'All Day Event',start: new Date(y, m, 1)}
  , {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)}
  , {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false}
  , {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false}
  , {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false}
  , {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
  , mkevt('Monday'    , 1, 14, 4)
  , mkevt('Tuesday'   , 2, 14, 2)
  , mkevt('Wednesday' , 3, 14, 1)
  , mkevt('Thursday'  , 4, 14, 2)
  , mkevt('Friday'    , 5, 14, 4)
  , mkevt('Saturday'  , 6, 14, 2)
  , mkevt('Sunday'    , 7, 14, 1)
  , mkevt('Friday 2'  , 5, 14, 10)
  , e
  ].map(function(item) {
    return {
      start: moment(item.start),
      end: moment(item.end),
      title: item.title,
      id: item.id || (item.id = cid++),
      summary: item.summary || (item.id + ' ---- ' + item.title)
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
});;
var views = ['day', 'month', 'events'];

angular.module('nx-calendar')
  .controller('nx-calendar-controller', function($scope, nxCalendarConfiguration) {
    $scope.config = angular.extend(nxCalendarConfiguration.config, $scope.config || {});

    // if there is no correct "view", set it to the first view available
    if(views.indexOf($scope.view) === -1) {
      $scope.view = views[0];
    }
  })
;;var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition(directive) {
  return function(nxCalendarConfiguration) {
    var template = nxCalendarConfiguration.template;

    return {
      scope: {
        config: '=' + directive + 'Config',
        source: '=' + directive
      },
      templateUrl: template('calendar'),
      link: function($scope, iElem, iAttrs) {
        $scope.view = iAttrs.view;
      }
    };
  };
};

['nxCalendar', 'nxCal'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});
;var app = angular.module('nx-calendar');

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


;var app = angular.module('nx-calendar');

app.controller('nx-calendar-day-event-controller', function($scope) {
  var minutes = ($scope.end - $scope.start) * 60
    , day     = $scope.day.clone().hour($scope.start);

  $scope.position = {
    top   : 100 * $scope.event.start.diff(day, 'minutes') / minutes
  , left  :  10 * ($scope.event.slot - 1)
  , height: 100 * $scope.event.end.diff($scope.event.start, 'minutes') / minutes
  , width : 100 - 10 * ($scope.event.slot - 1)
  };

  $scope.position.top     = Math.max(0  , $scope.position.top); // at least 0%
  $scope.position.height  = Math.min(100, $scope.position.height);
});

var directiveDefinition = function directiveDefinition(directive) {
  return function(nxCalendarConfiguration) {
    var template  = nxCalendarConfiguration.template;

    return {
      scope: {
        start : '=start'
      , end   : '=end'
      , day   : '=day'
      , event : '=' + directive
      },
      templateUrl : template('calendarDayEvent'),
      controller  : 'nx-calendar-day-event-controller'
    };
  };
};

['nxCalendarDayEvent', 'nxCalDayEvent'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});


;var app = angular.module('nx-calendar');

app.controller('nx-calendar-days-controller', function($scope, nxCalendarUtilities) {

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

  $scope.hours = nxCalendarUtilities.range(config.start, config.end, function(hour) {
    return moment().hour(hour).minute(0);
  });

  $scope.days = nxCalendarUtilities.range(config.days).map(function(day) {
    return config.day.clone().add(day, 'day').startOf('day');
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


;var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition() {
  return function() {

    return {
      restrict: 'A',
      scope: {
        posx  : '=left'
      , posy  : '=top'
      , height: '=height'
      , width : '=width'
      },
      link: function($scope, iElement, iAttrs) {
        var refresh = function refresh() {
          $scope.x = $scope.posx;
          $scope.y = $scope.posy;
          $scope.mode = ['%', 'percent'].indexOf(iAttrs.nxPosition) !== -1 ? '%' : 'px';

          var css = {
            left    : +($scope.x      || 0) + '' + $scope.mode
          , top     : +($scope.y      || 0) + '' + $scope.mode
          , height  : +($scope.height || 0) + '' + $scope.mode
          , width   : +($scope.width  || 0) + '' + $scope.mode
          };
          Object.keys(css).map(function(key) {
            if(!iAttrs.hasOwnProperty(key))
              delete css[key];
          });

          iElement.css(css);
        };

        $scope.$watch('posx', refresh);
        $scope.$watch('posy', refresh);
        $scope.$watch('height', refresh);
        $scope.$watch('width', refresh);
      }
    };
  };
};

['nxPosition'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});
;angular.module('nx-calendar').factory('nxRangeFilterFactory', function(isEventInRangeFilter) {
  return function(start, end) {
    return function(event) {
      return isEventInRangeFilter(event, start, end);
    };
  };
});;  /**
   *  unique-filter function to be applied with Array::filter
   **/
  var uniqueFilter = function(item, index, list) {
    return list.indexOf(item, index + 1) < 0;
  };

angular.module('nx-calendar').factory('nxSlotFactory', function(nxRangeFilterFactory) {
  /**
   * slotfactory creates different slots for events. That is necessary as they
   * may overlapp regarding start and end time. Before using slotFactory it
   * is necessary to order the list of events regarding time and length.
   *  @important This method changes the elements of the list!
   *  @param property
   *  @return map-function
   */
  var slotFactory = function slotFactory(property) {
    return function slotify(item, index, list) {
      var slots = list.slice(0, index)
        .filter(nxRangeFilterFactory(item.start, item.end))
        .map(function(event) {
          return event[property];
        })
        .filter(uniqueFilter)
        .sort();
      var slot = slots
        .reduce(function(result, item, index) {
          return !result && (item !== index + 1) ? index + 1 : result;
        }, undefined);
      item[property] = slot || slots.length + 1;
      return item;
    };
  };

  // shorthand for map-notation
  // remove the property and rebuild the list
  slotFactory.slot = function(property, list) {
    list.map(function(event) {
      delete event[property];
    });
    return list.map(slotFactory(property));
  };

  return slotFactory;
});;var app = angular.module('nx-calendar')

  .filter('isEvent', function() {
    return function(evt) {
      if(!evt)
        return false;
      if(evt.hasOwnProperty('start') && evt.hasOwnProperty('end'))
        return evt.hasOwnProperty('summary');
      return false;
    };
  })

;
;var app = angular.module('nx-calendar')

  .filter('isEventAfter', function(toMomentFilter) {
    return function(evt, time) {
      return toMomentFilter(evt).start.isAfter(time || moment());
    };
  })

;
;var app = angular.module('nx-calendar')

  .filter('isEventBefore', function(toMomentFilter) {
    return function(evt, time) {
      return toMomentFilter(evt).end.isBefore(time || moment());
    };
  })

;
;var app = angular.module('nx-calendar')

  .filter('isEventInRange', function(isEventBeforeFilter, isEventAfterFilter) {
    return function(evt, start, end) {
     return !isEventAfterFilter(evt, end) && !isEventBeforeFilter(evt, start);
    };
  })

;
;var app = angular.module('nx-calendar')

  .filter('isEventList', function(isEventFilter) {
    return function(list) {
      return  angular.isArray(list)
          &&  list.filter(isEventFilter).length === list.length;
    };
  })

;
;angular.module('nx-calendar')
  .filter('isEventSource', function(isEventListFilter) {
    var isString = angular.isString;

    return function(source) {
      if(isEventListFilter(source))
        return true;
      if(angular.isFunction(source) || (angular.isArray(source) && (source.length === source.filter(angular.isFunction).length)))
        return true;
      if(isString(source) || (angular.isArray(source) && (source.length === source.filter(isString).length)))
        return true;
      return false;
    };
  })

;
;angular.module('nx-calendar')

  .filter('isRange', function() {
    return function(range) {
      return range.hasOwnProperty('start')
          && range.hasOwnProperty('end')
          && moment.isMoment(range.start)
          && moment.isMoment(range.end)
      ;
    };
  })

;
;angular.module('nx-calendar')
  .filter('moment', function() {
    return function(date, format) {
      if(!format) return moment(date);
      return moment(date).format(format);
    };
  })

;
;var app = angular.module('nx-calendar')

  .filter('toMoment', function() {
    return function(evt) {
      if(!moment.isMoment(evt.start))
        evt.start = moment(evt.start);
      if(!moment.isMoment(evt.end))
        evt.end = moment(evt.end);
      return evt;
    };
  })

;
;angular.module('nx-calendar').provider('nxCalendarConfiguration', function() {
    var config = {

      path        : ['scripts', 'modules']
    , directory   : 'templates'
    , suffix      : '.html'
    , module      : 'nx-calendar'

    , template: function(path) {
        return config.path.concat([config.module, config.directory])
                          .concat(Array.prototype.slice.call(arguments))
                          .join('/') + config.suffix;
      }
    , config: {
        format: {
          time: 'H a'
        , dayLabel: {
            long: 'dddd, t\\he Do of MMMM'
          , short: 'dddd'
          }
        , label: 'wo'
        }
      }
    };

    return {
      $get: function() {
        return config;
      },
      template: config.template,
      set: function(key, value) {
        config[key] = value;
      },
      config: config
    };
  });var $injector;

angular.module('nx-calendar').provider('nxEventSource', function() {

  var namespaces, slotify, self = {

  /**
   *  Internal configuration
   **/
    config: {
      events: {
        add   : 'nx-event-source-add',
        remove: 'nx-event-source-remove',
        update: 'nx-event-source-update'
      }
    }
  };

  // simple provide function to retrieve different parts of the system as needed
  var provide = function(provider) {
    return $injector.get(provider);
  };

  var handler = [];

  var broadcast = function(scope, type, events, namespace) {
    if(!events.length) return;
    scope.$broadcast(namespace, {
      type: type,
      events: events,
      namespace: namespace
    });
  };

  /**
   * creates a filter-function with a filter-parameter object
   *  @param filter object with the parameters for the filter
   *    - start & end used as a in-range filter
   *    - namespace used as type filter
   *  @return function
   *    @param namespace for the namespace filter
   *    @params event list of events to be filtered
   **/
  var createFilter = function(_filter) {
    var range = provide('isRangeFilter')(_filter) && provide('nxRangeFilterFactory')(_filter.start, _filter.end);

    return function(namespace, events) {
      if(_filter.namespace && namespace !== _filter.namespace)
        return [];
      return range ? events.filter(range) : events;
    };
  };

  /**
   *  Broadcast any event changes
   *  @IMPORTANT
   *  This method might blow up when
   *    - to many handlers are registered, the handler functions need to be very small
   *    - there are many small changes to the events, as this method needs to be called for every change
   **/
  self.broadcast = function(type, events, namespace) {
    // first broadcast in rootscope
    broadcast(provide('$rootScope'), type, events, type);
    // call each handler
    handler.forEach(function(handle) {
      handle(type, events, namespace);
    });
  };

  /**
   * creates a new handler and adds it to the handler list
   *  @param scope $scope that will be used to broadcast the event
   *  @param event string that will be used as eventname
   *  @param [filter] filters used to reduce the events
   **/
  self.handler = function(scope, event, filter) {
    var filterFn = createFilter(filter);
    // create handle-fn to handle the filtering and broadcasting of the events
    var handle = function handle(type, events, namespace) {
      var publish = filterFn(namespace, events).map(slotify);
      // console.log(scope.$id, event, publish.length);
      // publish.map(function(evt) {
      //   console.log(evt.slot, evt.summary);
      //   console.log(evt.start.format('HH:mm') + ' > ' + evt.end.format('HH:mm'));
      // });
      broadcast(scope, type, publish, event);
    };
    // return remove-fn
    handle.remove = function remove() {
      // remove handle-fn from list of handlers
      handler = handler.filter(function(item) {
        return handle !== item;
      });
    };
    // add handle-fn to list of handlers
    handler.push(handle);
    // add clean-up
    scope.$on('$destroy', handle.remove);

    return handle;
  };

  self.provider = {
    // return all root-events
    events: function() { return self.config.events; },
    // reset the provider
    clear: function() { namespaces = {}; },
    // @DEBUG format an event for console output
    format: function(evt) {
      if(angular.isArray(evt)) return evt.map(self.provider.format);
      if(!provide('isEventFilter')(evt))return;
      var format = 'DD.MM.YYYY HH:mm:ss';
      console.log(evt.start.format(format), evt.end.format(format), evt.summary);
    },
    /**
     * register an eventsource into the provider
     *  @param [name] a name the source should be found as
     *  @param source the source data to be
     *  @throws if source fails the isEventSource-filter
     **/
    register: function(namespace, source) {
      if(typeof namespace !== 'string') {
        var tmp = source;
        source    = namespace;
        namespace = tmp || 0;
      }

      if(!angular.isArray(source))
        source = [source];

      if(!provide('isEventSourceFilter')(source))
        throw new Error('Can\'t register event source' + (namespace ? ' in \'' + namespace + '\'.' : '.'), {
          source: source
        });
      namespaces[namespace] = (namespaces[namespace] || []).concat(source);
      self.broadcast(self.config.events.add, namespaces[namespace], namespace);
    },

    /**
     * subscribes a scope to an event
     *   registers an on-destroy handler to remove the generated handle from the scope
     *  @param scope the scope the event should be registered in
     *  @param event the name of the event that should be broadcasted
     *  @param [filter] - object
     *    - namespace property that will check if the events are in the correct namespace
     *    - start&end properties will check if the events are in the range between start & end
     *  @param [fn] callback that will be registered in the scope
     **/
    subscribe: function(scope, event, filter, fn) {
      if(angular.isFunction(filter)) {
        fn      = filter;
        filter  = {};
      }
      event = event || self.config.events.update;
      var handle = self.handler(scope, event, filter || {});
      if(angular.isFunction(fn)) {
        scope.$on(event, fn);
      }
      Object.keys(namespaces).forEach(function(namespace) {
        handle(self.config.events.add, namespaces[namespace], namespace);
      });
    },

    /**
     * retrieves the sources via some filters
     *  @param [namespace] the namespace to use
     *  @param [start&end] start and end moment to filter the resulted events list
     *  @return eventsources
     **/
    get: function(namespace, start, end) {
      if(moment.isMoment(namespace)) {
        end = start;
        start = namespace;
        namespace = 0;
      } else {
        namespace = namespace || 0;
      }

      var filter = {};
      if(namespace) filter.namespace = namespace;
      if(moment.isMoment(start) && moment.isMoment(end)) {
        filter.start = start;
        filter.end = end;
      }

      var result = namespaces.hasOwnProperty(namespace) ? namespaces[namespace] : [];
      return createFilter(filter)(namespace, result);
    }

  };

  /** release the provider into the world **/
  self.$get = function(_$injector_, nxSlotFactory) {
    slotify = nxSlotFactory('slot');
    $injector = _$injector_;
    self.provider.clear();
    return self.provider;
  };

  return self;

});;angular.module('nx-calendar').provider('nxCalendarUtilities', function() {
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
;
angular.module('application', [
    'ui.router',
    'configuration',
    'nx-calendar-demo',
  ])

  .config(function($locationProvider, $urlRouterProvider, configProvider) {
    var config = configProvider.config;

    config.routing.html5Mode = false; // needs to work everywhere
    config.routing.default = "/day";

    // Default route:
    $urlRouterProvider.otherwise(config.routing.default);

    if(config.routing.html5Mode) {
      $locationProvider.html5Mode(true);
    }
    else {
      $locationProvider.html5Mode(false);
      var routingPrefix = config.routing.prefix;
      if(routingPrefix && routingPrefix.length > 0) {
        $locationProvider.hashPrefix(routingPrefix);
      }
    }
  })

  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  .controller('appCtrl', function($scope) {
    $scope.title = 'Raynode - nx-calendar directive demo';
  })
;