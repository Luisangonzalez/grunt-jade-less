module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          livereload: false,
          base: 'build',
          port: 8000
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'build/js/build.js': ['src/js/*.js']
        },
        options: {
          require: ['jquery']
        }
      }
    },
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
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['src/js/*.js', 'src/less/*.less', 'src/pug/*.pug', 'src/js/*.js'],
        tasks: ['eslint', 'less', 'pug', 'browserify'],
        options: {
          livereload: true,
        }
      },
    },
  });


  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // Start web server
  grunt.registerTask('server', [
    'connect:server',
    'watch'
  ]);


};
