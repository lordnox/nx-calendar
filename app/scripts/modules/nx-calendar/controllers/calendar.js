
var views = ['day', 'month', 'events'];

angular.module('nx-calendar')
  .controller('nx-calendar-controller', function($scope, nxCalendarConfiguration) {
    $scope.config = angular.extend(nxCalendarConfiguration.config, $scope.config || {});

    // if there is no correct "view", set it to the first view available
    if(views.indexOf($scope.view) === -1) {
      $scope.view = views[0];
    }
  })
;