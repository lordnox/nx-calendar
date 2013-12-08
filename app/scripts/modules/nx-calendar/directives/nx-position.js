var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition(directive) {
  return [function() {

    return {
      restrict: 'A',
      scope: {
        position: '=nxPosition'
      },
      link: function($scope, iElement, iAttrs) {
        var refresh = function refresh() {
          console.log('REFRESH');
          $scope.x = $scope.position.x;
          $scope.y = $scope.position.y;
          $scope.mode = ['%', 'percent'].indexOf($scope.position.mode) ? '%' : 'px';

          if($scope.mode === '%') {
            $scope.x = Math.min(100, Math.max(0, $scope.x));
            $scope.y = Math.min(100, Math.max(0, $scope.y));
          }

          iElement.css({
            left    : $scope.x + "" + $scope.mode
          , top     : $scope.y + "" + $scope.mode
          });
        }

        $scope.$watch($scope.position, refresh);
      }

    };
  }];
};

['nxPosition'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
})
