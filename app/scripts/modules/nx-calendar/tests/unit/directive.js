//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Controllers", function() {

  var module
    , $rootScope
    , $compile
    ;

  var compile = function(tpl, $scope, preDigest) {
    if(!$scope) {
      $scope = $rootScope;
    }
    var element = $compile("<div>" + tpl + "</div>")($scope);
    (preDigest || function(){})(element);
    $scope.$digest();
    return element;
  };

  beforeEach(angular.mock.module('nx-calendar'));

  beforeEach(function() {
    module = angular.module('nx-calendar');
  });

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe("nxCalendar", function() {

    it("should not compile a div element", function() {
      var element = compile("<div/>");
      element.html().should.be.equal("<div></div>");
    });

    it("should compile a div with attribute nx-calendar", function() {
      var element = compile("<div nx-calendar/>");
      element.html().should.not.be.equal("<div nx-calendar=\"\"></div>");
      console.log(element.html());
    });

  });

});



