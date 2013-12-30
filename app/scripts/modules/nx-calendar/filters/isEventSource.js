var app = angular.module('nx-calendar')

  .filter('isEventSource', function(isEventListFilter) {
    var isFunction = function(cb) {
      return typeof cb === "function";
    }, isString = function(str) {
      return typeof str === "string";
    };

    return function(source) {
      if(isEventListFilter(source))
        return true;
      if(isFunction(source) || (angular.isArray(source) && (source.length === source.filter(isFunction).length)))
        return true;
      if(isString(source) || (angular.isArray(source) && (source.length === source.filter(isString).length)))
        return true;
      return false;
    };
  })

;
