var module, $injected = {};

var Types = {
  controller: {
    preInject: ['define-module', 'load-module'],
    inject: ['$rootScope', '$compile'],
    postInject: ['define-compile'],
  },
  provider: {
    inject: ['$rootScope', '$compile']
  },
  directive: {
    preInject: ['define-module', 'load-module'],
    inject: ['$rootScope', '$compile'],
    postInject: ['define-compile', 'scope'],
  }
};

var noop = function() {};

var unit = function(module, types) {

  types = types || Object.keys(Types);
  console.log('Starting unit test for ' + module);
  console.log('testing:', types)

  var compile = function(tpl, $scope, fn) {
    $scope = $scope || $injected.$rootScope;
    var element = $injected.$compile("<div>" + tpl + "</div>")($scope);
    (fn || noop)(element, $scope);
    $scope.$digest();
    return element;
  };

  var collect = {
    preInject : [],
    inject    : [],
    postInject: [],
    publish   : []
  }, collected = {};

  var injecting = [];

  types.forEach(function(typ) {
    Object.keys(collect).forEach(function(key) {
      collect[key] = collect[key].concat(Types[typ][key] || []);
    });
  });

  Object.keys(collect).forEach(function(key) {
    collected[key] = collect[key].filter(function(typ, i) {
      return -1 === collect[key].indexOf(typ, i + 1);
    });
  });

  collected.inject.push(function() {
    Array.prototype.slice.call(arguments).forEach(function(injection, index) {
      var key = collect.inject[index];
      $injected[key] = injection;
    });
  });

  var methods = {
    "define-module" : angular.mock.module(module),
    "load-module"   : function() { angular.module(module); },
    "define-compile": function() { unit.compile = compile; },
    "scope"         : function() { unit.scope = function() { return $injected.$rootScope.$new(); }; }
  }

  var apply = function(list) {
    return function() {
      var self, args = Array.prototype.slice.call(arguments);
        list.forEach(function(key) {
          methods[key].apply(self, args);
        });
      };
    ;
  };

  [
    apply(collected.preInject),
    inject(collected.inject),
    apply(collected.postInject)
  ].forEach(function(fn) {
    beforeEach(fn);
  });

};