//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Controllers", function() {

  var module
    , $rootScope
    , $controller
    ;

  var controller = function(ctrl, mock) {
   //create a scope object for us to use.

    if(!mock) mock = {};
    if(!mock.$scope) {
      mock.$scope = $rootScope.$new();
    }

    //now run that scope through the controller function,
    //injecting any services or other injectables we need.
    return $controller(ctrl, mock);
  };

  beforeEach(angular.mock.module('nx-calendar'));

  beforeEach(function() {
    module = angular.module('nx-calendar');
  });

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe("nx-calendar-controller", function() {

    var scope, mock;

    beforeEach(function() {
      scope = $rootScope.$new();
      mock  = { $scope: scope };
    });

    it("should have a configuration filled with defaults", function() {
      controller('nx-calendar-controller', mock);
      scope.should.have.property('config');
      scope.should.have.property('view');
    });

    it("should have set the view-property to 'day' when undefined", function() {
      controller('nx-calendar-controller', mock);
      scope.view.should.be.equal('day');
    });

    it("should have use the view-property when it was set to 'month'", function() {
      scope.view = 'month';
      controller('nx-calendar-controller', mock);
      scope.view.should.be.equal('month');
    });

    it("should have use the view-property when it was set to 'events'", function() {
      scope.view = 'events';
      controller('nx-calendar-controller', mock);
      scope.view.should.be.equal('events');
    });

    it("should have set the view-property to 'day' when it is set to 'test'", function() {
      scope.view = 'test';
      controller('nx-calendar-controller', mock);
      scope.view.should.be.equal('day');
    });

  });

});
