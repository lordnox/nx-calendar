var $injector;

angular.module('nx-calendar').provider('nxEventSource', function() {

  var sourcemap;

  var provide = function(provider) {
    return $injector.get(provider);
  };

  var handler = [];

  self.broadcast = function(type, events, name) {
    // first broadcast in rootscope
    $rootScope = provide('$rootScope');
    $rootScope.$broadcast(type, events);

    handler.forEach(function(handle) {
      handle(name, events, type);
    });
    console.log(type, events.length, name)
  };

  self.handler = function(scope, event, filter) {
    console.log(scope.$id + ' is registering a handler for event ' + event)
    var rangeFilter = angular.noop
      , nameFilter = angular.noop
      ;
    if(provide('isRangeFilter')(filter)) {
      rangeFilter = provide('nxRangeFilter')(filter.start, filter.end);
    }
    if(filter.name) {
      nameFilter = function(name) { return name === filter.name; };
    }
    handle = function(name, events, type) {
      console.log(nameFilter(name));
    };
    handler.push(handle);
    return function() {
      console.log(scope.$id + ' is going to be destroyed');
    }
  };


  self.config = {
    events: {
      add: 'nx-event-source-add',
      remove: 'nx-event-source-remove',
      update: 'nx-event-source-update'
    }
  };

  self.provider = {

    events: function() { return self.config.events; },

    clear: function() {
      sourcemap = {};
    },

    defaultName: function(name) {
      return name || 'nx-default-calendar';
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