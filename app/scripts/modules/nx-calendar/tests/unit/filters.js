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
      it("google-event, should be true", function() {
        filter(fixtures.googleCalendarEvent).should.be.ok;
      });

      it("moment-event, should be true", function() {
        filter(fixtures.momentedEvent).should.be.ok;
      });

      it("no start, should be false", function() {
        filter(fixtures.wrongEvents.noStart).should.not.be.ok;
      });

      it("no end, should be false", function() {
        filter(fixtures.wrongEvents.noEnd).should.not.be.ok;
      });

      it("no summary, should be false", function() {
        filter(fixtures.wrongEvents.noSummary).should.not.be.ok;
      });
    });
  });

  describe("toMoment", function() {
    var filter;

    beforeEach(function() {
      filter = $filter("toMoment");
    });

    it("should change a google-event to a moment-event", function() {
      var evt = filter(fixtures.googleCalendarEvent);
      moment.isMoment(evt.start).should.be.ok;
      moment.isMoment(evt.end).should.be.ok;
    });
  });

  describe("isEventBefore", function() {
    var filter;

    beforeEach(function() {
      filter = $filter("isEventBefore");
    });

    it("should exist", function() {
      should.exist(filter);
    });

    it("should take now, if no second argument was given", function() {
      var evt = {
        end: moment().subtract(1, 'second')
      };
      filter(evt).should.be.ok;
    })

    it("should evaluate to true when the end time is before the time", function() {
      var time = moment();
      var evt = {
        end: time.clone().subtract(1, 'second')
      };
      filter(evt, time).should.be.ok;
    });

    it("should evaluate to false when the end time is after the time", function() {
      var time = moment();
      var evt = {
        end: time.clone().add(1, 'second')
      };
      filter(evt, time).should.not.be.ok;
    });
  });

  describe("isEventAfter", function() {
    var filter;

    beforeEach(function() {
      filter = $filter("isEventAfter");
    });

    it("should exist", function() {
      should.exist(filter);
    });

    it("should take now, if no second argument was given", function() {
      var evt = {
        start: moment().add(1, 'second')
      };
      filter(evt).should.be.ok;
    })

    it("should evaluate to true when the start time is before the time", function() {
      var time = moment();
      var evt = {
        start: time.clone().add(1, 'second')
      };
      filter(evt, time).should.be.ok;
    });

    it("should evaluate to false when the start time is after the time", function() {
      var time = moment();
      var evt = {
        start: time.clone().subtract(1, 'second')
      };
      filter(evt, time).should.not.be.ok;
    });
  });

  describe("isEventInRange", function() {
    var filter;

    beforeEach(function() {
      filter = $filter("isEventInRange");
    });

    it("should exist", function() {
      should.exist(filter);
    });

    it("should evaluate to false when the event ends before the range", function() {
      var time = moment();
      var evt = {
        start: time.clone().subtract(2, 'second'),
        end: time.clone().subtract(1, 'second')
      };
      var start = time.clone(),
          end = time.clone().add(1, 'second');
      filter(evt, start, end).should.not.be.ok;
    });

    it("should evaluate to false when the event starts after the range", function() {
      var time = moment();
      var evt = {
        start: time.clone().add(2, 'second'),
        end: time.clone().add(3, 'second')
      };
      var start = time.clone(),
          end = time.clone().add(1, 'second');
      filter(evt, start, end).should.not.be.ok;
    });

    it("should evaluate to true when the event starts and ends in the range", function() {
      var time = moment();
      var evt = {
        start: time.clone(),
        end: time.clone().add(1, 'second')
      };
      var start = time.clone().subtract(1, 'second'),
          end = time.clone().add(2, 'second');
      filter(evt, start, end).should.be.ok;
    });

    it("should evaluate to true when the event ends in the range", function() {
      var time = moment();
      var evt = {
        start: time.clone(),
        end: time.clone().add(2, 'second')
      };
      var start = time.clone().add(1, 'second'),
          end = time.clone().add(3, 'second');
      filter(evt, start, end).should.be.ok;
    });

    it("should evaluate to true when the event starts in the range", function() {
      var time = moment();
      var evt = {
        start: time.clone().add(2, 'second'),
        end: time.clone().add(4, 'second')
      };
      var start = time.clone().add(1, 'second'),
          end = time.clone().add(3, 'second');
      filter(evt, start, end).should.be.ok;
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


var fixtures = {
  etag: '-ETAG',
  string: '-STRING',
  boolean: true
};

fixtures.googleCalendarEvent = {
  "kind": "calendar#event",
  "etag": fixtures.etag,
  "id": fixtures.string,
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
  "anyoneCanAddSelf": fixtures.boolean,
  "guestsCanInviteOthers": fixtures.boolean,
  "guestsCanModify": fixtures.boolean,
  "guestsCanSeeOtherGuests": fixtures.boolean,
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

fixtures.momentedEvent = {
  "summary": "This is the summary",
  "description": "This is the description",
  "start": moment(),
  "end": moment()
};

fixtures.wrongEvents = {
  noStart: {
    "summary": "This is the summary",
    "end": moment()
  },
  noEnd: {
    "summary": "This is the summary",
    "start": moment()
  },
  noSummary: {
    "start": moment(),
    "end": moment()
  },
}