var $injected = {}, $injector;

var Types = {
  controller: {
    preInject: ['define-module', 'load-module'],
    inject: [],
    postInject: []
  },
  provider: {
    preInject: ['define-module', 'load-module'],
    inject: [],
    postInject: []
  },
  directive: {
    preInject: ['define-module', 'load-module'],
    inject: [],
    postInject: []
  },
  filter: {
    preInject: ['define-module', 'load-module'],
    inject: [],
    postInject: []
  }
};

var noop = function() {};

var unit = function(module, types) {

  types = types || Object.keys(Types);
  console.log('Unit-Testing: ' + module, types);

  beforeEach(function() {
    unit.module = angular.mock.module(module);
    angular.module(module);
  });
  beforeEach(inject(function(_$injector_) {
    $injector = _$injector_;
  }));

};

unit.scope = function() { return unit.provider('$rootScope').$new(); };
unit.compile = function(tpl, $scope, fn) {
  $scope = $scope || unit.provider('$rootScope');
  var element = unit.provider('$compile')("<div>" + tpl + "</div>")($scope);
  (fn || noop)(element, $scope);
  $scope.$digest();
  return element;
};
unit.filter = function(filter) {
  return unit.provider('$filter')(filter);
};
unit.provider = function(provider) {
  return $injector.get(provider);
};

unit.counter = function() {
  var counter = function() {
    counter.count++;
  };
  counter.count = 0;
  return counter;
};
