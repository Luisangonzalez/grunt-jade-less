module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    connect: {
      server: {
        options: {
          livereload: false,
          base: 'build',
          port: 8000
        }
      }
    },
    // Use npm packages and nodejs module
    browserify: {
      dist: {
        files: {
          'build/js/build.js': ['src/js/*.js']
        },
        // Add npm packages require
        options: {
          require: ['jquery'],
          transform: [
            ['babelify', {
              presets: ['es2015']
            }]
          ]
        }
      }
    },
    // Minify JS
    uglify: {
      dist: {
        options: {
          sourceMapName: 'build/js/build.min.map',
        },
        files: [{
          src: 'build/js/build.js',
          dest: 'build/js/build.min.js'
        }]
      }
    },
    // Minify css
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      dist: {
        files: {
          'build/css/style.min.css': 'build/css/style.css'
        }
      }
    },
    // the same if want minify html https://www.npmjs.com/package/grunt-contrib-htmlmin
    //
    // Linter JS with eslint
    eslint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    less: {
      development: {
        options: {
          paths: ['build/css']
        },
        files: {
          'build/css/style.css': 'src/less/*.less'
        }
      }
    },
    sass: {
      dist: {
        files: {
          'build/css/style.css': 'src/sass/*.scss'
        }
      }
    },
    // Compile pug
    pug: {
      compile: {
        options: {
          data: {
            debug: true
          }
        },
        files: {
          'build/index.html': ['src/pug/*.pug']
        }
      }
    },
    // watcher files
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['Gruntfile.js', 'src/js/*.js', 'src/less/*.less',
          'src/sass/*.scss', 'src/pug/*.pug', 'src/js/*.js'],
        tasks: ['eslint', 'less', 'sass', 'pug', 'browserify', 'uglify', 'cssmin'],
        options: {
          livereload: true,
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-sass');


  // Start web server
  grunt.registerTask('server', [
    'connect:server',
    'watch'
  ]);
  // Start web server
  grunt.registerTask('build', ['eslint', 'less', 'pug', 'browserify', 'uglify', 'cssmin']);

};
