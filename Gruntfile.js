'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    license: '/*! <%= grunt.file.read("./LICENSE") %>*/\n\n',
    concat: {
      all: {
        options: {
          banner: '<%= license %>'
        },
        src: [
          'src/module.js',
          'src/*/**/*.js'
        ],
        dest: 'build/ng-drag.js'
      }
    },
    uglify: {
      drag: {
        files: {
          'build/ng-drag.min.js': ['build/ng-drag.js']
        }
      }
    },
    ngAnnotate: {
      survey: {
        files: { 'build/ng-drag.js': ['build/ng-drag.js'] }
      }
    },
    watch: {
      all: {
        files: ['src/**/*.js'],
        tasks: [
          'build',
          'docs:ngdrag'
        ],
        options: { spawn: false }
      }
    },
    connect: {
      docs: {
        options: {
          base: 'docs',
          port: 9090,
          hostname: 'localhost',
          livereload: true,
          open: true,
          keepalive: true
        }
      }
    },
    ngdocs: {
      options: {
        dest: 'docs'
      },
      ngdrag: {
        src: ['src/**/*.js'],
        title: 'ngDrag'
      },
      pages: {
        options: {
          dest: '.'
        },
        src: ['src/**/*.js'],
        title: 'ngDrag'
      }
    }
  });

  grunt.registerTask('build', [
    'concat',
    'ngAnnotate',
    'uglify',
    'docs:ngdrag'
  ]);

  grunt.registerTask('serve-docs', ['build', 'connect']);

  grunt.registerTask('default', 'build');

  grunt.registerTask('docs', [
    'ngdocs:ngdrag'
  ]);
};
