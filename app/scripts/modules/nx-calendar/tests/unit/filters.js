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

    describe("no event types, should eval to false", function() {
      it("integer", function() {
        filter(123).should.not.be.ok;
        filter(0).should.not.be.ok;
      });
    });

    describe("event types", function() {
      it("google-event", function() {

        filter(types.googleCalendarEvent).should.not.be.ok;
      });
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


var types = {
  etag: '-ETAG',
  string: '-STRING',
  boolean: true
};

types.googleCalendarEvent = {
    "kind": "calendar#event",
    "etag": types.etag,
    "id": types.string,
    "created": new Date(),
    "updated": new Date(),
    "summary": "This is the summary",
    "description": "This is the description",
    "location": "This is the location",
    "visibility": "default",
    "colorId": "red",
    "creator": {
      "id": "m8doslak",
      "email": "a@b.com",
      "displayName": "Lordnox",
      "self": true
    },
    "organizer": {
      "id": "m8doslak",
      "email": "a@b.com",
      "displayName": "Lordnox",
      "self": true
    },
    "start": {
      "date": new Date(),
      "dateTime": new Date(),
      "timeZone": "CET"
    },
    "end": {
      "date": new Date(),
      "dateTime": new Date(),
      "timeZone": "CET"
    },
    "endTimeUnspecified": false,
    "recurrence": "no",
    "recurringEventId": "",
    "originalStartTime": {
      "date": new Date(),
      "dateTime": new Date(),
      "timeZone": "CET"
    },
    "iCalUID": "282mmn23nc923",
    "sequence": 0,
    "attendees": [{
        "id": "m8doslak",
        "email": "a@b.com",
        "displayName": "Lordnox",
        "self": true,
        "organizer": true,
        "resource": false,
        "optional": true,
        "responseStatus": "none",
        "comment": "(bow)",
        "additionalGuests": 0}
      ],
    "attendeesOmitted": false,
    "anyoneCanAddSelf": types.boolean,
    "guestsCanInviteOthers": types.boolean,
    "guestsCanModify": types.boolean,
    "guestsCanSeeOtherGuests": types.boolean,
    "locked": true,
    "reminders": {
      "useDefault": true,
      "overrides": [
        {
          "method": "E-Mail",
          "minutes": 15
        }
      ]
    }
  };

