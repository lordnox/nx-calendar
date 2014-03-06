//
// test/unit/controllers/controllersSpec.js
//
xdescribe("Unit: Testing Filters", function() {

  unit("nx-calendar", ["provider"]);

  describe("nxRangeFilter", function() {
    var provider, time;

    beforeEach(function() {
      time = moment();
      provider = unit.provider("nxRangeFilter");
    });

    it("should exist", function() {
      should.exist(provider);
    });

    it("should create a curried filter function", function() {
      var evt = {
        start: time.clone().subtract(2, 'second'),
        end: time.clone().subtract(1, 'second')
      };
      var start = time.clone(),
          end = time.clone().add(1, 'second');
      provider(start, end)(evt).should.not.be.ok;
    });

    it("should filter an array of events", function() {
      var mkEvt = function(time) {
        return {
          start: time.clone().add(0, 'second'),
          end: time.clone().add(1, 'second')
        }
      };
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
});
