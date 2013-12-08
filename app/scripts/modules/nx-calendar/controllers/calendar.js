
var views = ['day', 'month', 'events'];

angular.module('nx-calendar')
  .controller('nx-calendar-controller', ['$scope', 'nxCalendarConfiguration', function($scope, configuration) {
    $scope.config = angular.extend(configuration.config, $scope.config || {});

    // if there is no correct "view", set it to the first view available
    if(views.indexOf($scope.view) === -1) {
      $scope.view = views[0];
    }

  }])
;