angular.module('nx-calendar').provider('nxCalendarConfiguration', function() {
    var config = {

      path        : ['scripts', 'modules']
    , directory   : 'templates'
    , suffix      : '.html'
    , module      : 'nx-calendar'

    , template: function(path) {
        return config.path.concat([config.module, config.directory])
                          .concat(Array.prototype.slice.call(arguments))
                          .join('/') + config.suffix;
      }
    };

    return {
      $get: function() {
        return config;
      },
      template: config.template,
      set: function(key, value) {
        config[key] = value;
      },
      config: config
    };
  })