//
// test/unit/controllers/controllersSpec.js
//

describe('Unit: Testing Directives Controllers', function() {

  var $rootScope
    , $controller
    ;

  var fixture = {
    event: function(summary, time) {
      return {
        summary: summary,
        start: time.clone().subtract(1, 'second'),
        end: time.clone()
      };
    },
  };

  var provide = function(item) {
    var result;
    inject([item, function(item) {
      result = item;
    }]);
    return result;
  };

  var controller = function(ctrl, mock) {
   //create a scope object for us to use.

    if(!mock) mock = {};
    if(!mock.$scope) {
      mock.$scope = $rootScope.$new();
    }

    //now run that scope through the controller function,
    //injecting any services or other injectables we need.
    return $controller(ctrl, mock);
  };

  beforeEach(angular.mock.module('nx-calendar'));

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('nx-calendar-days-controller', function() {
    var scope, mock;

    describe('basics', function() {
      beforeEach(function() {
        scope = $rootScope.$new();
        mock  = { $scope: scope };
      });

      it('should have a configuration filled with defaults', function() {
        controller('nx-calendar-days-controller', mock);
        scope.should.have.property('timeFormat');
        scope.should.have.property('weekFormat');
        scope.should.have.property('dayFormat');
        scope.should.have.property('hours');
        scope.should.have.property('days');
      });
    });

    describe('without configuration', function() {

      it('should create the controller', function() {
        scope       = $rootScope.$new();
        mock        = { $scope: scope };
        controller('nx-calendar-days-controller', mock);
      });

      it('should have a days.length of 1', function() {
        scope.days.should.have.length(1);
      });

      it('should have 24 hours', function() {
        scope.hours.should.have.length(24);
      });
    });

    describe('with configuration', function() {
      it('should create the controller', function() {
        scope = $rootScope.$new();
        scope.config = {
          days: 3,
          day: moment().add(2, 'days'),
          start: 7,
          end: 18,
          source: 'important'
        };
        mock        = { $scope: scope };
        controller('nx-calendar-days-controller', mock);
      });

      it('should have a days.length of 1', function() {
        scope.days.should.have.length(3);
      });

      it('should start on the day after tomorrow', function() {
        scope.days[0].isSame(moment().add(2, 'days'), 'day').should.be.true;
        scope.days[1].isSame(moment().add(3, 'days'), 'day').should.be.true;
        scope.days[2].isSame(moment().add(4, 'days'), 'day').should.be.true;
      });

      it('should have 11 hours', function() {
        scope.hours.should.have.length(18-7);
      });
    });
  });

  describe('nx-calendar-day-container-controller', function() {
    var scope, mock, eventsource, day;

    describe('basics', function() {
      beforeEach(function() {
        scope = $rootScope.$new();
        mock  = { $scope: scope };
      });

      it('should have a configuration filled with defaults', function() {
        controller('nx-calendar-day-container-controller', mock);
        scope.should.have.property('start');
        scope.should.have.property('end');
        scope.should.have.property('events');
      });
    });

    describe('events', function() {
      it('should create the controller', function() {
        scope       = $rootScope.$new();
        mock        = { $scope: scope };
        day         = moment().hour(15);
        scope.day   = day.clone();
        scope.source= 'important';
        scope.start = 10;
        scope.end   = 20;
        eventsource = provide('nxEventSource');
        controller('nx-calendar-day-container-controller', mock);
      });

      it('should have no event', function() {
        scope.events.should.have.length(0);
      });

      it('should add one \'unimportant\' event to the eventsource', function() {
        eventsource.register(fixture.event('Summary of Event', day), 'unimportant');
      });

      it('should still have no event', function() {
        scope.events.should.have.length(0);
      });

      it('should add one \'important\' event to the eventsource', function() {
        eventsource.register(fixture.event('Summary of Event', day), 'important');
      });

      it('should have one event', function() {
        scope.events.should.have.length(1);
      });
    });
  });
});
