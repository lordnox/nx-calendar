angular.module('nx-calendar')
  .filter('isEventSource', function(isEventListFilter) {
    var isString = angular.isString;

    return function(source) {
      if(isEventListFilter(source))
        return true;
      if(angular.isFunction(source) || (angular.isArray(source) && (source.length === source.filter(angular.isFunction).length)))
        return true;
      if(isString(source) || (angular.isArray(source) && (source.length === source.filter(isString).length)))
        return true;
      return false;
    };
  })

;
