
module.exports = function(config) {
  var conf = {
    basePath   : '../',
    frameworks : ['jasmine'],
    reporters  : ['dots', 'growl'],
    browsers   : ['PhantomJS'],
    autoWatch  : true,

    // these are default values anyway
    singleRun  : false,
    colors     : true
  };

  config.set(conf);
};
