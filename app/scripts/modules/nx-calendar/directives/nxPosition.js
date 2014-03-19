var app = angular.module('nx-calendar');

var directiveDefinition = function directiveDefinition() {
  return function() {

    return {
      restrict: 'A',
      scope: {
        posx  : '=left'
      , posy  : '=top'
      , height: '=height'
      , width : '=width'
      },
      link: function($scope, iElement, iAttrs) {
        var refresh = function refresh() {
          $scope.x = $scope.posx;
          $scope.y = $scope.posy;
          $scope.mode = ['%', 'percent'].indexOf(iAttrs.nxPosition) !== -1 ? '%' : 'px';

          var css = {
            left    : +($scope.x      || 0) + '' + $scope.mode
          , top     : +($scope.y      || 0) + '' + $scope.mode
          , height  : +($scope.height || 0) + '' + $scope.mode
          , width   : +($scope.width  || 0) + '' + $scope.mode
          };
          Object.keys(css).map(function(key) {
            if(!iAttrs.hasOwnProperty(key))
              delete css[key];
          });

          iElement.css(css);
        };

        $scope.$watch('posx', refresh);
        $scope.$watch('posy', refresh);
        $scope.$watch('height', refresh);
        $scope.$watch('width', refresh);
      }
    };
  };
};

['nxPosition'].map(function(directive) {
  app.directive(directive, directiveDefinition(directive));
});
