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
        url: '/',
        templateUrl: template('month')
      })
      .state('calendar.week', {
        url: '/',
        templateUrl: template('week')
      })
      .state('calendar.day', {
        url: '/',
        templateUrl: template('day')
      })
      .state('calendar.events', {
        url: '/',
        templateUrl: template('events')
      })
      .state('calendar.settings', {
        url: '/',
        templateUrl: template('settings')
      })
  })

;


