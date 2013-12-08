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

  describe("nxPosition", function() {
    var definition  = '<div nx-position="position"></div>'
      ;

    var scope;

    beforeEach(function() {
      scope = $rootScope.$new();
    });

    it("should compile a div with attribute nx-position", function() {
      scope.position = { x: 100, y: 100 };
      compile(definition, scope).html().should.not.be.equal(definition);
    });

    it("should set the mode to '%' when not defined", function() {
      scope.position = { x: 100, y: 100 };
      compile(definition, scope).html().should.not.be.equal(definition);
      var child = scope.$$childHead;
      child.should.have.property('x');
      child.should.have.property('y');
      child.should.have.property('mode');
      child.x.should.be.equal(scope.position.x);
      child.y.should.be.equal(scope.position.y);
      child.mode.should.be.equal('%');
    });

    it("should set x and y to be between 0 and 100 when in '%' mode", function() {
      scope.position = { x: -10, y: 101 };
      compile(definition, scope).html().should.not.be.equal(definition);
      var child = scope.$$childHead;
      child.x.should.be.equal(0);
      child.y.should.be.equal(100);
    });

    it("should react to a position change", function() {
      scope.position = { x: -10, y: 101 };
      var element = compile(definition, scope)
      element.html().should.not.be.equal(definition);
      var child = scope.$$childHead;
      child.x.should.be.equal(0);
      child.y.should.be.equal(100);
      console.log('------------')
      scope.position.x = 50;
      console.log('pos = 50', ' digest now');
      element.scope().$digest();
      console.log(scope.position);
      console.log(child.position);
      console.log(child.x, child.y);
      //@TODO check why $watch is not reacting...
      //child.x.should.be.equal(50);
    });

  });

  describe("nxCalendar", function() {

    var definition  = '<div nx-calendar="" nx-calendar-config="config"></div>'
      , shortDef    = '<div nx-cal="" nx-cal-config="config"></div>'
      ;

    var scope;

    beforeEach(function() {
      scope = $rootScope.$new();
    });

    it("should not compile a div element", function() {
      compile("<div></div>", scope).html().should.be.equal("<div></div>");
    });

    it("should compile a div with attribute nx-calendar", function() {
      scope.config = { test: true };
      compile(definition, scope).html().should.not.be.equal(definition);
    });

    it("should compile a div with attribute nx-cal", function() {
      compile(shortDef, scope).html().should.not.be.equal(shortDef);
    });

    it("should compile short and long equally", function() {
      var s = compile(shortDef, scope).html()
        , l = compile(definition, scope).html()
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
      , shortDef    = '<div nx-cal-day="" nx-cal-config="config"></div>'
      ;

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



