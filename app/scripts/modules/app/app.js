var app = angular.module('app', [
  'ui.router',
  'configuration'
])

  .config(function ($stateProvider, configProvider) {

    var template = configProvider.template('app');

    /**
     *    Define an abstract state that itself defines the navigation element and a container for the
     *    sub-states
     **/
    $stateProvider
      .state('app', {
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
      .state('app.home', {
        url: '/index.html',
        templateUrl: template('index')
      })
      .state('app.about', {
        url: '/about.html',
        templateUrl: template('about')
      })
  })

;


