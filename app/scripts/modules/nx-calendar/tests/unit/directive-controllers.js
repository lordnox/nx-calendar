//
// test/unit/controllers/controllersSpec.js
//

describe("Unit: Testing Directives Controllers", function() {

  var $rootScope
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

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe("nx-calendar-day-controller", function() {
    var scope, mock;

    beforeEach(function() {
      scope = $rootScope.$new();
      mock  = { $scope: scope };
    });

    it("should have a configuration filled with defaults", function() {
      controller('nx-calendar-day-controller', mock);
      scope.should.have.property('timeFormat');
      scope.should.have.property('weekFormat');
      scope.should.have.property('dayFormat');
      scope.should.have.property('days');
      scope.should.have.property('hours');
      scope.should.have.property('start');
      scope.should.have.property('end');
    });

    it("should have some methods", function() {
      controller('nx-calendar-day-controller', mock);
      scope.should.have.property('setTimeslot');
    });
  });

});



