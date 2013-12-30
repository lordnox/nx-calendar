var $injector;

angular.module('nx-calendar').provider('nxEventSource', function() {

  var sourcemap;

  var provide = function(provider) {
    return $injector.get(provider);
  };

  var fnTrue = function() { return true; };

  var handler = [];

  var broadcast = function(scope, type, events, name) {
    scope.$broadcast(name, {
      type: type,
      events: events,
      name: name
    });
  }

  /**
   *  Broadcast any event changes
   *  @IMPRTANT
   *    This method might blow up when
   *    - to many handlers are registered, the handler functions need to be very small
   *    - there are many small changes to the events, as this method needs to be called for every change
   **/
  self.broadcast = function(type, events, name) {
    // first broadcast in rootscope
    broadcast(provide('$rootScope'), type, events, type);
    // call each handler
    handler.forEach(function(handle) {
      handle(name, events, type);
    });
  };

  /**
   *  creates a new handler and adds it to the handler list
   **/
  self.handler = function(scope, event, filter) {
    // define filter function as accepting
    var rangeFilter = fnTrue
      , nameFilter = fnTrue
      ;
    // redefine if needs to be filtered
    if(provide('isRangeFilter')(filter)) {
      rangeFilter = provide('nxRangeFilter')(filter.start, filter.end);
    }
    // redefine if needs to be filtered
    if(filter.name) {
      nameFilter = function(name) { return name === filter.name; };
    }
    // create handle-fn to handle the filtering and broadcasting of the events
    var handle = function handle(name, events, type) {
      var publish = events.filter(rangeFilter);
      if(nameFilter(name) &&  publish.length) {
        broadcast(scope, type, publish, event);
      };
    };
    // add handle-fn to list of handlers
    handler.push(handle);
    // return remove-fn
    return function remove() {
      // remove handle-fn from list of handlers
      handler = handler.filter(function(item) {return handle !== item; });
    };
  };

  /**
   *  Internal configuration
   **/
  self.config = {
    events: {
      add: 'nx-event-source-add',
      remove: 'nx-event-source-remove',
      update: 'nx-event-source-update'
    },
    default: 'nx-default-calendar'
  };

  self.provider = {

    events: function() { return self.config.events; },

    clear: function() {
      sourcemap = {};
    },

    defaultName: function(name) {
      return name || self.config.default;
    },

    format: function(evt) {
      if(angular.isArray(evt)) return evt.map(self.provider.format);
      if(!provide('isEventFilter')(evt))return;
      var format = 'HH:mm:ss';
      console.log(evt.start.format(format), evt.end.format(format), evt.summary)
    },

    register: function(name, source) {

      if(typeof name !== 'string') {
        source = name;
        name = self.provider.defaultName();
      }

      if(!angular.isArray(source))
        source = [source];

      sourcemap[name] = (sourcemap[name] || []).concat(source);

      self.broadcast(self.config.events.add, source, name);
    },

    subscribe: function(scope, event, filter) {
      scope.$on('$destroy', self.handler(scope, event, filter || {}));
    },

    get: function(name, start, end) {
      if(moment.isMoment(name)) {
        end = start;
        start = name;
        name = self.provider.defaultName();
      } else {
        name = self.provider.defaultName(name);
      }
      var result = sourcemap.hasOwnProperty(name) ? sourcemap[name] : [];
      if(moment.isMoment(start) && moment.isMoment(end)) {
        result = result.filter(provide('nxRangeFilter')(start, end));
      }
      return result;
    }

  };

  self.$get = function(_$injector_) {
    $injector = _$injector_;
    self.provider.clear();
    return self.provider;
  };

  return self;

});