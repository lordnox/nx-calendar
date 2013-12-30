//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Controllers", function() {

  unit("nx-calendar", ["provider"]);

  var fixtures = {
    name: 'myEvents',
    event: function(summary, time) {
      return {
        summary: summary,
        start: time.clone().subtract(1, 'second'),
        end: time.clone()
      }
    },
    events: function(time) {
      return [
        fixtures.event('before', time.clone().subtract(10, 'seconds')),
        fixtures.event('inRange', time.clone()),
        fixtures.event('after', time.clone().add(10, 'seconds'))
      ];
    }
  }

  describe("nx-calendar-providers", function() {

    var scope, provider, time;

    beforeEach(function() {
      scope = unit.scope();
    });

    describe("nxEventSource", function() {

      beforeEach(function() {
        time = moment();
        provider = unit.provider('nxEventSource');
        provider.clear();
      });

      it("should provide some methods", function() {
        provider.should.have.property("register");  // register a event source
        provider.should.have.property("subscribe"); // subscribe to an event range filtered by a source name
        provider.should.have.property("get");       // retrieve all events from a named source in a range
      });

      describe("getting", function() {

        beforeEach(function() {
          provider.register(fixtures.name, fixtures.events(time));
          provider.register(fixtures.event('default-event', time));
        });

        it("should get all events by source name", function() {
          provider.get().should.have.length(1);
          provider.get(fixtures.name).should.have.length(3);
        });

        it("should get all events in a range", function() {
          provider.get(fixtures.name, time.clone().subtract(1, 'second'), time.clone().add(3, 'second')).should.have.length(1);
        });

      });

      describe("registering", function() {

        it("should be able to register an event", function() {
          var evt = fixtures.event('myEvent', time);
          provider.register(fixtures.name, evt);
          provider.get(fixtures.name).should.have.length(1);
          provider.get(fixtures.name)[0].should.be.equal(evt);
        });

        it("should be able to register an array of events", function() {
          var evts = [
            fixtures.event('myEvent 1', time),
            fixtures.event('myEvent 2', time)
          ];
          provider.register(fixtures.name, evts);
          provider.get(fixtures.name).should.have.length(2);
          provider.get(fixtures.name)[0].should.be.equal(evts[0]);
          provider.get(fixtures.name)[1].should.be.equal(evts[1]);
        });
      });

      describe("subscribing", function() {

        it("should be able to subscribe to events in a range", function() {

          var time = moment(),
              start = time.clone(),
              end = time.clone().add(4, 'seconds')
              ;

          var evt = {
            summary: "Test-Event 1",
            start: time.clone().add(1, 'second'),
            end: time.clone().add(2, 'seconds')
          };

          var evt2 = {
            summary: "Test-Event 2",
            start: time.clone().add(1, 'second'),
            end: time.clone().add(2, 'seconds')
          };

          var eventname = fixtures.name;

          // counter init
          var allCounter = unit.counter(),
              nameCounter = unit.counter();
          scope.$on(provider.events().add, allCounter);
          scope.$on(eventname, nameCounter);

          allCounter.count.should.be.equal(0);
          nameCounter.count.should.be.equal(0);
          // request every event that is registered to be broadcasted with the eventname
          provider.subscribe(scope, eventname);

          allCounter.count.should.be.equal(0);
          nameCounter.count.should.be.equal(0);

          provider.register([evt]);

          allCounter.count.should.be.equal(1);
          nameCounter.count.should.be.equal(1);

          scope.$destroy();

          provider.register([evt2]);

          allCounter.count.should.be.equal(2);
          nameCounter.count.should.be.equal(1);

        });

      });

    });

  });

});
