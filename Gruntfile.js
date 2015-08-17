'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    opts: {
      livereload: 35102
    },
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
        options: {
          livereload: '<%= opts.livereload %>'
        },
        files: ['src/**/*.js'],
        tasks: [
          'build',
          'docs:ngdrag'
        ]
      }
    },
    connect: {
      docs: {
        options: {
          base: 'docs',
          port: 9090,
          hostname: 'localhost',
          livereload: '<%= opts.livereload %>',
          open: true
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
          dest: ''
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

  grunt.registerTask('serve-docs', [
    'build',
    'connect',
    'watch'
  ]);

  grunt.registerTask('default', 'build');

  grunt.registerTask('docs', [
    'ngdocs:ngdrag'
  ]);
};
