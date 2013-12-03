//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: States Routing", function() {

  var module
    , $rootScope
    , $state
    ;

  beforeEach(angular.mock.module('nx-calendar-demo'));

  beforeEach(function() {
    module = angular.module('nx-calendar-demo');
  });

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function(_$rootScope_, _$state_) {
    $rootScope = _$rootScope_;
    $state = _$state_;
  }));

  describe("'calendar' state", function() {
    var state;

    beforeEach(function() {
      state = $state.get('calendar');
    });

    it("should exist", function() {
      should.exist(state);
    });

    it("should be abstract", function() {
      state.abstract.should.be.ok;
    });

    it("should have a navigation view", function() {
      state.views['navigation'].should.exist;
    });

    it("should have a @ view that renders ui-view", function() {
      state.views['@'].should.exist;
      state.views['@'].template.should.be.equal('<ui-view/>');
    });
  });

  describe("'calendar.month' state", function() {
    var state;

    beforeEach(function() {
      state = $state.get('calendar.month');
    });

    it("should exist", function() {
      should.exist(state);
    });

    it("should not be abstract", function() {
      should.not.exist(state.abstract)
    });

    it("should have the url /month", function() {
      state.url.should.be.equal("/month");
    });

    it("should activate the demoCtrl-controller", function() {
      state.controller.should.be.equal("demoCtrl");
    });
  });

  describe("'calendar.week' state", function() {
    var state;

    beforeEach(function() {
      state = $state.get('calendar.week');
    });

    it("should exist", function() {
      should.exist(state);
    });

    it("should not be abstract", function() {
      should.not.exist(state.abstract)
    });

    it("should have the url /week", function() {
      state.url.should.be.equal("/week");
    });

    it("should activate the demoCtrl-controller", function() {
      state.controller.should.be.equal("demoCtrl");
    });
  });

  describe("'calendar.day' state", function() {
    var state;

    beforeEach(function() {
      state = $state.get('calendar.day');
    });

    it("should exist", function() {
      should.exist(state);
    });

    it("should not be abstract", function() {
      should.not.exist(state.abstract)
    });

    it("should have the url /day", function() {
      state.url.should.be.equal("/day");
    });

    it("should activate the demoCtrl-controller", function() {
      state.controller.should.be.equal("demoCtrl");
    });
  });

  describe("'calendar.events' state", function() {
    var state;

    beforeEach(function() {
      state = $state.get('calendar.events');
    });

    it("should exist", function() {
      should.exist(state);
    });

    it("should not be abstract", function() {
      should.not.exist(state.abstract)
    });

    it("should have the url /events", function() {
      state.url.should.be.equal("/events");
    });

    it("should activate the demoCtrl-controller", function() {
      state.controller.should.be.equal("demoCtrl");
    });
  });

  describe("'calendar.settings' state", function() {
    var state;

    beforeEach(function() {
      state = $state.get('calendar.settings');
    });

    it("should exist", function() {
      should.exist(state);
    });

    it("should not be abstract", function() {
      should.not.exist(state.abstract)
    });

    it("should have the url /settings", function() {
      state.url.should.be.equal("/settings");
    });

    it("should activate the demoCtrl-controller", function() {
      state.controller.should.be.equal("demoCtrl");
    });
  });

});
