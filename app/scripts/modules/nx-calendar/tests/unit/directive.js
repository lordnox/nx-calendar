//
// test/unit/controllers/controllersSpec.js
//

describe("Unit: Testing Directives", function() {

  unit("nx-calendar");

  describe("nxPosition", function() {
    var fixtures = {
        'noMode': '<div nx-position pos-x="position.x" pos-y="position.y"></div>',
        '%Mode' : '<div nx-position="%" pos-x="position.x" pos-y="position.y"></div>',
        'pxMode' : '<div nx-position="%" pos-x="position.x" pos-y="position.y"></div>'
      }
    ;

    var scope;

    beforeEach(function() {
      scope = unit.scope();
    });

    it("should compile a div with attribute nx-position", function() {
      scope.position = { x: 100, y: 100 };
      unit.compile(fixtures.noMode, scope).html().should.not.be.equal(fixtures.noMode);
    });

    it("should set the mode to 'px' when not defined", function() {
      scope.position = { x: 100, y: 100 };
      unit.compile(fixtures.noMode, scope).html().should.not.be.equal(fixtures.noMode);
      var child = scope.$$childHead;
      child.should.have.property('x');
      child.should.have.property('y');
      child.should.have.property('mode');
      child.x.should.be.equal(scope.position.x);
      child.y.should.be.equal(scope.position.y);
      child.mode.should.be.equal('px');
    });

    it("should set the mode correctly to %", function() {
      unit.compile(fixtures["%Mode"], scope).html().should.not.be.equal(fixtures["%Mode"]);
      var child = scope.$$childHead;
      child.mode.should.be.equal("%");
    });

    it("should set the mode correctly to %", function() {
      unit.compile(fixtures.pxMode, scope).html().should.not.be.equal(fixtures.pxMode);
      var child = scope.$$childHead;
      child.mode.should.be.equal("%");
    });

    it("should set x and y to be between 0 and 100 when in '%' mode", function() {
      scope.position = { x: -10, y: 101 };
      unit.compile(fixtures["%Mode"], scope).html().should.not.be.equal(fixtures["%Mode"]);
      var child = scope.$$childHead;
      child.x.should.be.equal(0);
      child.y.should.be.equal(100);
    });

    it("should react to a position change", function() {

      scope.position = { x: -10, y: 101 };
      unit.compile(fixtures["%Mode"], scope).html().should.not.be.equal(fixtures["%Mode"]);

      var child = scope.$$childHead;
      child.x.should.be.equal(0);
      child.y.should.be.equal(100);

      scope.position.x = 50;
      scope.$digest();

      child.x.should.be.equal(50);
      child.y.should.be.equal(100);
    });
  });

  describe("nxCalendar", function() {

    var definition  = '<div nx-calendar="" nx-calendar-config="config"></div>'
      , shortDef    = '<div nx-cal="" nx-cal-config="config"></div>'
      ;

    var scope;

    beforeEach(function() {
      scope = unit.scope();
    });

    it("should not compile a div element", function() {
      unit.compile("<div></div>", scope).html().should.be.equal("<div></div>");
    });

    it("should compile a div with attribute nx-calendar", function() {
      scope.config = { test: true };
      unit.compile(definition, scope).html().should.not.be.equal(definition);
    });

    it("should compile a div with attribute nx-cal", function() {
      unit.compile(shortDef, scope).html().should.not.be.equal(shortDef);
    });

    it("should compile short and long equally", function() {
      var s = unit.compile(shortDef, scope).html()
        , l = unit.compile(definition, scope).html()
        , ps = shortDef.indexOf(">")
        , pl = definition.indexOf(">")
        ;
      s.substr(ps).should.be.equal(l.substr(pl));
    });

    it("should have 3 comments", function() {
      var html = unit.compile(definition).html();
      html.should.match(/<!-- ngSwitchWhen: day -->/);
      html.should.match(/<!-- ngSwitchWhen: month -->/);
      html.should.match(/<!-- ngSwitchWhen: events -->/);
    });
  });

  describe("nxCalendarDayView", function() {

    var definition  = '<div nx-calendar-day="" nx-cal-config="config"></div>'
      , shortDef    = '<div nx-cal-day="" nx-cal-config="config"></div>'
      ;

    it("should compile a div with attribute nx-calendar-day", function() {
      unit.compile(definition).html().should.not.be.equal(definition);
    });

    it("should compile a div with attribute nx-cal-day", function() {
      unit.compile(shortDef).html().should.not.be.equal(shortDef);
    });

    it("should compile short and long equally", function() {
      var s = unit.compile(shortDef).html()
        , l = unit.compile(definition).html()
        , ps = shortDef.indexOf(">")
        , pl = definition.indexOf(">")
        ;
      s.substr(ps).should.be.equal(l.substr(pl));
    });
  });
});



