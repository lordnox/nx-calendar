//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Controllers", function() {

  var $rootScope
    , $controller
    , $scope
  ;

  var controller = function(ctrl, mock) {
   //create a scope object for us to use.

    if(!mock) mock = {};
    if(!mock.$scope) {
      mock.$scope = $rootScope.$new();
    }

    //now run that scope through the controller function,
    //injecting any services or other injectables we need.
    $scope = mock.$scope;
    return $controller(ctrl, mock);
  };

  beforeEach(angular.mock.module('nx-calendar-demo'));

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe("demoCtrl", function(){
    var ctrl;

    beforeEach(function() {
      ctrl = controller('demoCtrl');
    });

    it("should exist", function() {
      ctrl.should.exist;
    });

    it("should have added properties to the scope", function() {
      should.exist($scope.events);
      should.exist($scope.eventSource);
    });
  });

});
