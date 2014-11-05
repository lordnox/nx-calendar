var $injector;

angular.module('nx-calendar').provider('nxEventSource', function() {

  var namespaces, slotify, self = {

  /**
   *  Internal configuration
   **/
    config: {
      events: {
        add   : 'nx-event-source-add'
      , remove: 'nx-event-source-remove'
      , update: 'nx-event-source-update'
      }
    , namespace: 0
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
      publish.map(function(evt) {
        console.log(evt.slot, evt.summary);
        console.log(evt.start.format('HH:mm') + ' > ' + evt.end.format('HH:mm'));
      });
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
        namespace = tmp || self.config.namespace;
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
      var handle = self.handler(scope, event, filter);
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
        namespace = self.config.namespace;
      } else {
        namespace = namespace || self.config.namespace;
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

});