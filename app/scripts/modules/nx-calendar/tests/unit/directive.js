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

    var definition  = '<div nx-calendar=""></div>'
      , shortDef    = '<div nx-cal=""></div>';

    it("should not compile a div element", function() {
      compile("<div></div>").html().should.be.equal("<div></div>");
    });

    it("should compile a div with attribute nx-calendar", function() {
      compile(definition).html().should.not.be.equal(definition);
    });

    it("should compile a div with attribute nx-cal", function() {
      compile(shortDef).html().should.not.be.equal(shortDef);
    });

    it("should compile short and long equally", function() {
      var s = compile(shortDef).html()
        , l = compile(definition).html()
        , ps = shortDef.indexOf(">")
        , pl = definition.indexOf(">")
        ;
      s.substr(ps).should.be.equal(l.substr(pl));
    });

    it("should have 3 comments", function() {
      var html = compile(definition).html();
      html.should.match(/<!-- ngSwitchWhen: day -->/);
      html.should.match(/<!-- ngSwitchWhen: month -->/);
      html.should.match(/<!-- ngSwitchWhen: events -->/);
    });

  });

  describe("nxCalendarDayView", function() {

    var definition  = '<div nx-calendar-day="" nx-cal-config="config"></div>'
      , shortDef    = '<div nx-cal-day="" nx-cal-config="config"></div>';

    var element, scope;

    it("should compile a div with attribute nx-calendar-day", function() {
      compile(definition).html().should.not.be.equal(definition);
    });

    it("should compile a div with attribute nx-cal-day", function() {
      compile(shortDef).html().should.not.be.equal(shortDef);
    });

    it("should compile short and long equally", function() {
      var s = compile(shortDef).html()
        , l = compile(definition).html()
        , ps = shortDef.indexOf(">")
        , pl = definition.indexOf(">")
        ;
      s.substr(ps).should.be.equal(l.substr(pl));
    });

  });

});



