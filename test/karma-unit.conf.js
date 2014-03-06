
var project = require('../project');



module.exports = function(config) {
  var conf = {
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['dots', 'growl'],
    browsers: ['PhantomJS'],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true,

    files : [].concat(
      project.files.bower,
      project.files.test.lib,
      project.files.app,
      project.files.test.post
    )
  };
  config.set(conf);
};
