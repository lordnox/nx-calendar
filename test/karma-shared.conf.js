var Path = require('path');

var project = require('../project')
  , bower = require('../bower');

var base = '';

var postFiles = [], preFiles = [];

//@TODO: Read the bower.dependencies and generate the include list

var addFiles = function(files, list, dir) {
  var _base = base;
  if(dir) _base = Path.join(base, dir);
  list.forEach(function(file) {
    files.push(Path.join(_base, file));
  });
};

// first add bower files:
addFiles(preFiles, project.files.bower, project.bowerpath);

// add 3rd party code
addFiles(preFiles, project.files["3rd"]);

// add app files
addFiles(postFiles, project.files.app, project.apppath);

// add test files at the end
addFiles(preFiles, project.files.test);

module.exports = function() {
  return {
    basePath: '../',
    frameworks: ['mocha'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true,

    files : [],
  }
};

module.exports.project = project;
module.exports.preFiles = preFiles;
module.exports.postFiles = postFiles;
