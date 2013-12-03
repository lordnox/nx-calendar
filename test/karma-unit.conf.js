var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  var conf = sharedConfig();

  conf.files = sharedConfig.preFiles.concat([
    //extra testing code
    'bower_components/angular-mocks/angular-mocks.js',

    //mocha stuff
    'test/mocha.conf.js',

  ]).concat(sharedConfig.postFiles);

  // sortierung der "files" ist nicht richtig...
  // erst bibliotheken aus bower
  // dann testing bibliotheken
  // dann dateien

  console.log(sharedConfig.project);

  config.set(conf);
};
