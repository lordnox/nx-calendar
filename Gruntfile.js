var Path = require('path');

var project = require('./project');

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    build: {
      templates: {
        files: project.files.templates
      }
    },

    concat: {
      styles: {
        dest: './app/assets/app.css',
        src: project.files.styles
      },
      scripts: {
        options: {
          separator: ';'
        },
        dest: './app/assets/app.js',
        src: [].concat(
          project.files.bower,
          project.files.app
        )
      },
      templates: {
        dest: project.templatesPath + '/templates.js',
        src: project.templatesPath + '/template_*.js'
      }
    },

    connect: {
      options: {
        base: 'app/',
        livereload: true
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
    },

    open: {
      devserver: {
        path: 'http://localhost:' + project.server.devPort
      },
      coverage: {
        path: 'http://localhost:' + project.server.coveragePort
      }
    },

    preprocess: {
      prod: {
        src: "app/index.preprocess.html",
        dest: "app/index.html"
      },
      dev: {
        src: "app/index.preprocess.html",
        dest: "app/index.html"
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

    stylus: {
      compile: {
        options: {
          compress: false
        },
        files: {
          'app/styles/calendar.css': ['app/styles/calendar.styl']
        }
      }
    },

    watch: {
      assets: {
        files: ['app/styles/**/*.css','app/scripts/**'],
        tasks: ['module-templates', 'concat']
      },
      stylus: {
        files: ['app/**/*.styl'],
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('test',        ['test:unit']);
  grunt.registerTask('test:unit',   ['karma:unit']);

  //keeping these around for legacy use
  grunt.registerTask('autotest',        ['autotest:unit']);
  grunt.registerTask('autotest:unit',   ['module-templates', 'connect:testserver', 'karma:unit_auto']);

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

  grunt.registerTask('process:prod', "Start the preprocess task as production", function() {
    process.env.TASK = 'preprocess-prod';

    var task = {
      "appjs_hash"    : 'dist/assets/app.*.js',
      "vendorjs_hash" : 'dist/assets/vendor.*.js',
      "appcss_hash"   : 'dist/assets/app.*.css'
    };

    Object.keys(task).forEach(function(v) {
      var file = grunt.file.expand(task[v])[0];
      process.env[v] = Path.basename(file);
    });

    grunt.task.run('preprocess:prod');
  });

  grunt.registerTask('process:dev', "Start the preprocess task as development", function() {
    process.env.TASK = 'preprocess-dev';

    var base = "app/";

    var js  = [].concat(
          project.files.bower,
          project.files.app
        ),
        css = [].concat(
          project.files.styles
        );

    process.env.script_tags = grunt.file.expand(js).map(function(v) {
      return "    <script src='" + (v.substr(base.length)) + "'></script>";
    }).join("\n");

    process.env.style_tags = grunt.file.expand(css).map(function(v) {
      return "    <link rel=\"stylesheet\" type=\"text/css\" href=\"" + (v.substr(base.length)) + "\"/>";
    }).join("\n");

    grunt.task.run('preprocess:dev');
  });

};
