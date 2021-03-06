  //
// test/unit/controllers/controllersSpec.js
//

describe('Unit: Testing Controllers', function() {

  unit('nx-calendar');

  var fixtures = {
    name: 'myEvents',
    event: function(summary, time) {
      return {
        summary: summary,
        start: time.clone().subtract(1, 'second'),
        end: time.clone()
      };
    },
    events: function(time) {
      return [
        fixtures.event('before', time.clone().subtract(10, 'seconds')),
        fixtures.event('inRange', time.clone()),
        fixtures.event('after', time.clone().add(10, 'seconds'))
      ];
    }
  };

  describe('nxCalendarUtilities', function() {
    var provider, day = moment();

    var mkEvt = function(hour, duration, id) {
      return {
        start: day.clone().hour(hour),
        end: day.clone().hour(hour).add(duration, 'hours').add(-1, 'second'),
        id: id
      };
    };

    beforeEach(function() {
      provider = unit.provider('nxCalendarUtilities');
    });

    describe('sortByStartAndDuration', function() {
      var sort;

      beforeEach(function() {
        sort = provider.sortByStartAndDuration;
      });

      it('should order 2 events with different starting times', function() {
        var list = [
          mkEvt(15, 1, 2)
        , mkEvt(11, 1, 1)
        ];
        list.sort(sort);
        list.map(function(item, index) {
          item.id.should.be.equal(index + 1);
        });
      });

      it('should order 2 events with different durations', function() {
        var list = [
          mkEvt(11, 1, 2)
        , mkEvt(11, 2, 1)
        ];
        list.sort(sort);
        list.map(function(item, index) {
          item.id.should.be.equal(index + 1);
        });
      });

      xit('should order 1000 events in less than 500ms', function() {
        var x = 1000, e, s;
        var list = [];
        while(x-->0)
          list.push(mkEvt(10, 1, x));
        s = (new Date()).getTime();
        list.sort(sort);
        e = (new Date()).getTime();
        (e-s).should.be.lessThan(500, '"not so bad"-Error');
      });
    });
  });

  describe('nx-calendar-providers', function() {

    var scope, provider, time;

    beforeEach(function() {
      time = moment();
      scope = unit.scope();
    });

    describe('nxEventSource', function() {

      beforeEach(function() {
        time = moment();
        provider = unit.provider('nxEventSource');
        provider.clear();
      });

      it('should provide some methods', function() {
        provider.should.have.property('register');  // register a event source
        provider.should.have.property('subscribe'); // subscribe to an event range filtered by a source name
        provider.should.have.property('get');       // retrieve all events from a named source in a range
      });

      describe('getting', function() {

        beforeEach(function() {
          provider.register(fixtures.name, fixtures.events(time));
          provider.register(fixtures.event('default-event', time));
        });

        it('should get all events by source name', function() {
          provider.get().should.have.length(1);
          provider.get(fixtures.name).should.have.length(3);
        });

        it('should get all events in a range', function() {
          provider.get(fixtures.name, time.clone().subtract(1, 'second'), time.clone().add(3, 'second')).should.have.length(1);
        });
      });

      describe('registering', function() {

        it('should be able to register an event', function() {
          var evt = fixtures.event('myEvent', time);
          provider.register(fixtures.name, evt);
          provider.get(fixtures.name).should.have.length(1);
          provider.get(fixtures.name)[0].should.be.equal(evt);
        });

        it('should be able to register an array of events', function() {
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

      describe('subscribing', function() {

        var counters, evt, evt2;

        var assertCounters = function(counts) {
          Object.keys(counts).forEach(function(key) {
            counts[key].should.be.equal((counters[key]||{count:0}).count, 'counter `' + key + '` not right');
          });
        };

        beforeEach(function() {
          counters = {
            add: unit.counter(),
            update: unit.counter(),
            remove: unit.counter(),
            destroy: unit.counter()
          };
          unit.provider('$rootScope').$on(provider.events().add, counters.add);
          unit.provider('$rootScope').$on(provider.events().update, counters.update);
          unit.provider('$rootScope').$on(provider.events().remove, counters.remove);


          evt = {
            summary: 'Test-Event 1',
            start: time.clone().add(1, 'second'),
            end: time.clone().add(2, 'seconds')
          };

          evt2 = {
            summary: 'Test-Event 2',
            start: time.clone().add(1, 'second'),
            end: time.clone().add(2, 'seconds')
          };
        });

        it('should be able to subscribe to events in a range', function() {


          var eventname = fixtures.name;

          // counter init
          counters.local = unit.counter();
          counters.callback = unit.counter();

          assertCounters({
            add: 0,
            local: 0,
            callback: 0
          });

          scope.$on(eventname, counters.local);

          assertCounters({
            add: 0,
            local: 0,
            callback: 0
          });

          // request every event that is registered to be broadcasted with the eventname
          provider.subscribe(scope, eventname, counters.callback);

          assertCounters({
            add: 0,
            local: 0,
            callback: 0
          });

          provider.register([evt]);
          assertCounters({
            add: 1,
            local: 1,
            callback: 1,
            destroy: 0
          });

          scope.$on('$destroy', counters.destroy);
          scope.$destroy();
          // call $digest to clear the scope
          scope.$digest();

          assertCounters({
            add: 1,
            local: 1,
            callback: 1,
            destroy: 1
          });

          provider.register([evt2]);

          assertCounters({
            add: 2,
            local: 1,
            callback: 1
          });
        });

        it('should call the event when subscribing with existing events', function() {
          counters.callback = unit.counter();
          assertCounters({
            add: 0,
            callback: 0
          });
          provider.register([evt]);
          assertCounters({
            add: 1,
            callback: 0
          });
          provider.subscribe(scope, fixtures.name, counters.callback);
          assertCounters({
            add: 1,
            callback: 1
          });
        });

        it('should apply the filter correctly', function() {
          counters.unfiltered = unit.counter();
          counters.filtered = unit.counter();

          var evts = {
            filtered: fixtures.event('filtered', time),
            unfiltered: fixtures.event('unfiltered', time),
            named: fixtures.event('named', time)
          };


          provider.subscribe(scope, 'unfiltered', counters.unfiltered);
          provider.subscribe(scope, 'filtered', {namespace: 'named'}, counters.filtered);

          provider.register(evts.unfiltered);

          assertCounters({ filtered: 0, unfiltered: 1});

          provider.register(evts.filtered, 'filtered');

          assertCounters({ filtered: 0, unfiltered: 2});

          provider.register('named', evts.named);

          assertCounters({ filtered: 1, unfiltered: 3});
        });
      });

      describe('bugfixes', function() {
        var mkEvt
          , day = moment()
        ;

        beforeEach(function() {
          mkEvt = function(t, h, l) {
            return {
              summary : t
            , start   : day.clone().hour(h).minute(0)
            , end     : day.clone().hour(h+l).minute(0)
            };
          };
        });

        xit('bug () slotting', function() {
          // 2 Events on Friday, one multiday event turning over to saturday and one event on friday itself both had slot 1, expected slot 1 & 2
          var evts = [
            mkEvt('A', 14, 4)
          , mkEvt('B', 4, 25)
          ], called = false;

          provider.register(evts);

          provider.subscribe(scope, null, {
            start : day.clone().startOf('day')
          , end   : day.clone().endOf('day')
          }, function($evt, data) {
            called = true;
            data.events.should.have.length(2);
            var A = data.events[0]
              , B = data.events[1]
            ;
            A.summary.should.be.equal('A');
            B.summary.should.be.equal('B');
            A.should.have.property('slot');
            B.should.have.property('slot');
            console.log(A.start.format('HH:mm') + ' - ' +  A.end.format('HH:mm') + ' --- > ' + A.slot);
            console.log(B.start.format('HH:mm') + ' - ' +  B.end.format('HH:mm') + ' --- > ' + B.slot);
            A.slot.should.be.equal(2);
            B.slot.should.be.equal(1);

          });

          called.should.be.ok;
        });
      });
    });
  });
});
