var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition(directive) {
  return function($compile) {

    return {
      restrict: 'A',
      scope: {
        posx: '=posX',
        posy: '=posY'
      },
      link: function($scope, iElement, iAttrs) {
        var refresh = function refresh() {
          $scope.x = $scope.posx;
          $scope.y = $scope.posy;
          $scope.mode = ['%', 'percent'].indexOf(iAttrs['nxPosition']) !== -1 ? '%' : 'px';

          if($scope.mode === '%') {
            $scope.x = Math.min(100, Math.max(0, $scope.x));
            $scope.y = Math.min(100, Math.max(0, $scope.y));
          }

          iElement.css({
            left    : $scope.x + "" + $scope.mode
          , top     : $scope.y + "" + $scope.mode
          });
        };

        $scope.$watch("posx", refresh);
        $scope.$watch("posy", refresh);
      }
    };
  };
};

['nxPosition'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
})
