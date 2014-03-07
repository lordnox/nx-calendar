
var module = angular.module('application', [
    'ui.router',
    'configuration',
    'nx-calendar-demo',
  ])

  .config(function($locationProvider, $urlRouterProvider, configProvider) {
    var config = configProvider.config;

    config.routing.html5Mode = false; // needs to work everywhere
    config.routing.default = "/day";

    // Default route:
    $urlRouterProvider.otherwise(config.routing.default);

    if(config.routing.html5Mode) {
      $locationProvider.html5Mode(true);
    }
    else {
      $locationProvider.html5Mode(false);
      var routingPrefix = config.routing.prefix;
      if(routingPrefix && routingPrefix.length > 0) {
        $locationProvider.hashPrefix(routingPrefix);
      }
    }
  })

  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  .controller('appCtrl', function($scope) {
    $scope.title = 'Raynode - nx-calendar directive demo';
  })

;

//window.App = module;