angular.module('configuration', [])
  .provider('config', function() {


    var appVersion = 8;


    var templatePath = ['scripts', 'modules'];
    var templateDirectory = 'templates';
    var templateSuffix = '.html' + "?v=" + appVersion;
    var abstractTemplate = '<ui-view/>';


    var config = {

      version : appVersion,

      routing : {
        prefix : '',
        html5Mode : true,
        default: "/"
      },

      template: function(module) {
        var templateBase = templatePath.concat([module]).concat([templateDirectory])
        var tplFn = function(path) {
          return templateBase.concat(Array.prototype.slice.call(arguments)).join('/') + templateSuffix;
        };
        tplFn.abstract = abstractTemplate;
        return tplFn;
      }
    };

    config.template.abstract = abstractTemplate;

    return {
      $get: function() {
        return config;
      },
      prepareModuleTemplateUrl: config.prepareModuleTemplateUrl,
      prepareViewTemplateUrl: config.prepareViewTemplateUrl,
      template: config.template,
      set: function(key, value) {
        config[key] = value;
      },
      config: config
    };
  })
;
