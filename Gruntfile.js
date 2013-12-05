
var Path = require('path');

var project = require('./project')
  , bower = require('./bower');

var base = '';

var jsFiles = [], cssFiles = [], tplFiles = [];

//@TODO: Read the bower.dependencies and generate the include list

var addFiles = function(files, list, dir) {
  var _base = base;
  if(dir) _base = Path.join(base, dir);
  list.forEach(function(file) {
    var add = '';
    if(file[0] === '!') {
      add = '!';
      file = file.substring(1);
    }
    files.push(add + Path.join(_base, file));

  });
};

// first add bower files:
addFiles(jsFiles, project.files.bower, project.bowerpath);

// add 3rd party code
addFiles(jsFiles, project.files["3rd"]);

// add app files
addFiles(jsFiles, project.files.app, project.apppath);

// add styles
addFiles(cssFiles, project.files.styles);

addFiles(tplFiles, project.files.templates);

module.exports = function(grunt) {

//  console.log(Object.keys(grunt));

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // grunt.loadNpmTasks('grunt-shell');
  // grunt.loadNpmTasks('grunt-open');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    build: {
      templates: {
        files: tplFiles
      }
    },

    concat: {
      styles: {
        dest: './app/assets/app.css',
        src: cssFiles
      },
      scripts: {
        options: {
          separator: ';'
        },
        dest: './app/assets/app.js',
        src: jsFiles
      },
      templates: {
        dest: project.templatesPath + '/templates.js',
        src: project.templatesPath + '/template_*.js'
      }
    },

    connect: {
      options: {
        base: 'app/'
      },
      webserver: {
        options: {
          port: project.server.devPort,
          keepalive: true
        }
      },
      devserver: {
        options: {
          port: project.server.devPort
        }
      },
      testserver: {
        options: {
          port: project.server.testPort
        }
      },
      coverage: {
        options: {
          base: 'coverage/',
          port: project.server.coveragePort,
          keepalive: true
        }
      }
    },

    clean: {
      build: project.buildpath,
      templates: project.templatesPath
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: project.appbase,
            src: [
              '**',
              '!' + Path.join(project.assetspath, '**'),
              '**/*.html'
            ],
            dest: Path.join(project.buildpath, project.client),
          },
        ]
      }
    },

    'gh-pages': {
      options: {
        base: Path.join(project.buildpath, project.client)
      },
      src: ['**']
    },

    karma: {
      unit: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: './test/karma-unit.conf.js'
      },
      midway: {
        configFile: './test/karma-midway.conf.js',
        autoWatch: false,
        singleRun: true
      },
      midway_auto: {
        configFile: './test/karma-midway.conf.js'
      },
      e2e: {
        configFile: './test/karma-e2e.conf.js',
        autoWatch: false,
        singleRun: true
      },
      e2e_auto: {
        configFile: './test/karma-e2e.conf.js'
      }
    },

    open: {
      devserver: {
        path: 'http://localhost:' + project.server.devPort
      },
      coverage: {
        path: 'http://localhost:' + project.server.coveragePort
      }
    },

    shell: {
      options : {
        stdout: true
      },
      npm_install: {
        command: 'npm install'
      },
      bower_install: {
        command: './node_modules/.bin/bower install'
      },
      font_awesome_fonts: {
        command: 'cp -R bower_components/components-font-awesome/font app'
      }
    },

    watch: {
      assets: {
        files: ['app/styles/**/*.css','app/scripts/**'],
        tasks: ['module-templates', 'concat']
      }
    }
  });

  grunt.registerTask('test',        ['connect:testserver', 'karma:unit','karma:midway', 'karma:e2e']);
  grunt.registerTask('test:unit',   ['karma:unit']);
  grunt.registerTask('test:midway', ['connect:testserver', 'karma:midway']);
  grunt.registerTask('test:e2e',    ['connect:testserver', 'karma:e2e']);

  //keeping these around for legacy use
  grunt.registerTask('autotest',        ['autotest:unit']);
  grunt.registerTask('autotest:unit',   ['module-templates', 'connect:testserver','karma:unit_auto']);
  grunt.registerTask('autotest:midway', ['connect:testserver','karma:midway_auto']);
  grunt.registerTask('autotest:e2e',    ['connect:testserver','karma:e2e_auto']);

  //installation-related
  grunt.registerTask('install',   ['shell:npm_install', 'shell:bower_install', 'shell:font_awesome_fonts']);

  //defaults
  grunt.registerTask('default',   ['dev']);

  grunt.registerTask('build',     ['clean:build', 'copy:build']);

  //development
  grunt.registerTask('dev',       ['install', 'concat', 'connect:devserver', 'open:devserver', 'watch:assets']);

  //development
  grunt.registerTask('dev-no',    ['install', 'concat', 'connect:devserver', 'watch:assets']);
  grunt.registerTask('dev-local', ['concat', 'connect:devserver', 'watch:assets']);

  //server daemon
  grunt.registerTask('serve',     ['connect:webserver']);

  grunt.registerTask("module-templates", "Create templates for all modules seperately", function() {
    // read the current config
    var ngtemplates = grunt.config.get('ngtemplates') || {};

    // read all subdirectories from your modules folder
    grunt.file.expand(project.apppath + "/modules/*").forEach(function (dir) {
      // get the module name
      var module = Path.basename(dir);

      // define a new ngtemplates definition to copy all templates into the test directory
      ngtemplates[module] = {
        cwd:      project.appbase,
        src:      ['**/' + module + '/**/*.html'],
        dest:     project.templatesPath + '/template_' + module + '.js',
      };
    });
    // set the "better" config
    grunt.config.set('ngtemplates', ngtemplates);

    // when finished run the concatinations
    grunt.task.run(['ngtemplates', 'concat:templates']);
  });

};
