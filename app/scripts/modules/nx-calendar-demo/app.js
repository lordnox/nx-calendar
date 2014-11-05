var app = angular.module('nx-calendar-demo', [
  'ui.router',
  'configuration',
  'nx-calendar'
])

  .config(function ($stateProvider, configProvider, nxCalendarConfigurationProvider) {

    var template = configProvider.template('nx-calendar-demo');

    /**
     *    Define an abstract state that itself defines the navigation element and a container for the
     *    sub-states
     **/
    $stateProvider
      .state('calendar', {
        abstract: true,
        views: {
          '@': {
            template: template.abstract,
          },
          navigation: {
            templateUrl: template('navigation')
          }
        }
      })
      .state('calendar.month', {
        url: '/month',
        templateUrl: template('month'),
        controller: 'demoCtrl'
      })
      .state('calendar.week', {
        url: '/week',
        templateUrl: template('week'),
        controller: 'demoCtrl'
      })
      .state('calendar.weekExtra', {
        url: '/weekExtra',
        templateUrl: template('weekExtra'),
        controller: 'demoCtrl'
      })
      .state('calendar.day', {
        url: '/day',
        templateUrl: template('day'),
        controller: 'demoCtrl'
      })
      .state('calendar.events', {
        url: '/events',
        templateUrl: template('events'),
        controller: 'demoCtrl'
      })
      .state('calendar.settings', {
        url: '/settings',
        templateUrl: template('settings'),
        controller: 'demoCtrl'
      })
  })

;


