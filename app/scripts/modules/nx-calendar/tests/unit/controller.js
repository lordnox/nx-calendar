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

});
