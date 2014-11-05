//
// test/unit/controllers/controllersSpec.js
//

describe('Unit: Testing Filters', function() {

  unit('nx-calendar');

  describe('nxRangeFilterFactory', function() {
    var provider, time;

    var mkEvt = function(time) {
      return {
        start: time.clone().add(0, 'second'),
        end: time.clone().add(1, 'second')
      };
    };

    beforeEach(function() {
      time = moment();
      provider = unit.provider('nxRangeFilterFactory');
    });

    it('should exist', function() {
      should.exist(provider);
    });

    it('should create a curried filter function', function() {
      var evt = {
        start: time.clone().subtract(2, 'second'),
        end: time.clone().subtract(1, 'second')
      };
      var start = time.clone(),
          end = time.clone().add(1, 'second');
      provider(start, end)(evt).should.not.be.ok;
    });

    it('should filter an array of events', function() {

      var evts = [
        mkEvt(time.clone().add(1, 'seconds')), // 1 - 2
        mkEvt(time.clone().add(4, 'seconds')), // 4 - 5
        mkEvt(time.clone().add(7, 'seconds'))  // 7 - 8
      ];
      var start = time.clone().add(3, 'second'),
          end = time.clone().add(6, 'second');
      var filter = provider(start, end);
      evts.filter(filter).should.have.length(1);
    });
  });

  ddescribe('nxSlotFactory', function() {
    var provider, day, sod, eod;

    var mkEvt = function(hour, duration, id) {
      return {
        start: day.clone().hour(hour),
        end: day.clone().hour(hour).add(duration, 'hours').add(-1, 'second'),
        id: id
      };
    };

    beforeEach(function() {
      day = moment();
      sod = day.clone().startOf('day');
      eod = day.clone().endOf('day');
      provider = unit.provider('nxSlotFactory');
    });

    it('should have a shortcut method `slot`', function() {
      provider.should.have.property('slot');
      provider.slot.should.be.a.Function;
    });

    it('should generate an filter function', function() {
      provider().should.be.a.Function;
    });

    describe('::slot', function() {
      it('should work on an empty array', function() {
        var list = provider.slot('test', []);
        list.should.have.length(0);
      });

      it('should add the property to each element of the list', function() {
        var list = provider.slot('test', [
          mkEvt(10, 2, 1)
        ]);
        list.should.have.length(1);
        list[0].should.have.property('test');
        list[0].test.should.be.equal(1);
      });

      describe('slotting', function() {
        it('should set slot 1 to every event when they do not overlap', function() {
          var list = provider.slot('slot', [
            mkEvt( 9, 1, 1)
          , mkEvt(10, 1, 2)
          , mkEvt(11, 1, 3)
          , mkEvt(12, 1, 4)
          ]);
          list.map(function(evt) {
            evt.should.have.property('slot');
            evt.slot.should.be.equal(1);
          });
        });

        it('should set the slot in ascending order when all events have the same start and duration', function() {
          var list = provider.slot('slot', [
            mkEvt(10, 1, 1)
          , mkEvt(10, 1, 2)
          , mkEvt(10, 1, 3)
          , mkEvt(10, 1, 4)
          ]);
          list.map(function(evt, index) {
            evt.should.have.property('slot');
            evt.slot.should.be.equal(index + 1);
          });
        });

        it('test case 3', function() {
          provider.slot('slot', [
            mkEvt(10, 3, 1)
          , mkEvt(10, 1, 2)
          , mkEvt(11, 2, 3)
          ])
          .map(function(evt) { return evt.id + '-' + evt.slot; })
          .should.be.eql([
            '1-1'
          , '2-2'
          , '3-2'
          ]);
        });

        it('test case 3', function() {
          provider.slot('slot', [
            mkEvt(10, 3, 1)
          , mkEvt(10, 1, 2)
          , mkEvt(11, 2, 3)
          ])
          .map(function(evt) { return evt.id + '-' + evt.slot; })
          .should.be.eql([
            '1-1'
          , '2-2'
          , '3-2'
          ]);
        });

        it('test case 4', function() {
          provider.slot('slot', [
            mkEvt(10, 5, 1)
          , mkEvt(10, 1, 2)
          , mkEvt(14, 1, 3)
          ])
          .map(function(evt) { return evt.id + '-' + evt.slot; })
          .should.be.eql([
            '1-1'
          , '2-2'
          , '3-2'
          ]);
        });

        it('test case 5', function() {
          provider.slot('slot', [
            mkEvt(10, 2, 1)
          , mkEvt(11, 5, 2)
          , mkEvt(13, 2, 3)
          ])
          .map(function(evt) { return evt.id + '-' + evt.slot; })
          .should.be.eql([
            '1-1'
          , '2-2'
          , '3-1'
          ]);
        });

        iit("should slot 2 dates on friday correctly", function() {
          var day  = moment(new Date);
          var f    = "Do dddd";
          var cid  = 10;
          var mkevt = function(t, d, h, l, m) {
            var start = day.clone().day(d).hour(h).minute(m||0);
            var end   = day.clone().day(d).hour(h+l).minute(m||0);
            console.log("day: ", d, h, l, m);
            console.log(start.format(f), end.format(f));
            return {
              id    : cid++
            , title : t
            , start : start
            , end   : end
            };
          };

          var f1 = mkevt('Friday'    , 5, 14, 4)
            , f2 = mkevt('Friday 2'  , 5, 4, 25)
          ;

          provider.slot('slot', [f1, f2]);

          console.log(f1.slot, f2.slot)
        });
      });
    });
  });
});
