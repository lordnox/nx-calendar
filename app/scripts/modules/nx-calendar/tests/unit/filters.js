//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Filters", function() {

  var module
    , $rootScope
    , $filter
    ;

  beforeEach(angular.mock.module('nx-calendar'));

  beforeEach(function() {
    module = angular.module('nx-calendar');
  });

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function(_$rootScope_, _$filter_) {
    $rootScope = _$rootScope_;
    $filter = _$filter_;
  }));

  describe("isEvent", function() {
    var filter;

    beforeEach(function() {
      filter = $filter("isEvent");
    });

    it("should exist", function() {
      should.exist(filter);
    });

    it("should eval false values to false", function() {
      filter().should.not.be.ok;
      filter(false).should.not.be.ok;
      filter({}).should.not.be.ok;
      filter(0).should.not.be.ok;
      filter(123).should.not.be.ok;
      filter(true).should.not.be.ok;
      filter('argh').should.not.be.ok;
    });

  });


  describe("isEventSource", function() {
    var filter;

    beforeEach(function() {
      filter = $filter("isEventSource");
    });

    it("should exist", function() {
      should.exist(filter);
    });

    it("should eval false values to false", function() {
      filter().should.not.be.ok;
      filter(false).should.not.be.ok;
      filter({}).should.not.be.ok;
      filter(0).should.not.be.ok;
      filter(123).should.not.be.ok;
      filter(true).should.not.be.ok;
      filter('argh').should.not.be.ok;
    });

  });


  describe("isEventList", function() {
    var filter;

    beforeEach(function() {
      filter = $filter("isEventList");
    });

    it("should exist", function() {
      should.exist(filter);
    });

    it("should fail", function() {
      filter().should.not.be.ok;
      filter(false).should.not.be.ok;
      filter({}).should.not.be.ok;
      filter(0).should.not.be.ok;
      filter(123).should.not.be.ok;
      filter(true).should.not.be.ok;
      filter('argh').should.not.be.ok;
    });

    it("should work", function() {
      // @TODO should check contents
      filter([]).should.be.ok;
    });

  });

});
