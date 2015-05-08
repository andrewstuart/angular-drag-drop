module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        concat: {
            all: {
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
                tasks: ['build'],
                options: { spawn: false }
            }
        },
        ngdocs: {
          options: {
            dest: 'docs'
          },
          ngdrag: {
            src: ['src/**/*.js'],
            title: 'ngDrag'
          }
        }
    });

    grunt.registerTask('build', [
        'concat',
        'ngAnnotate',
        'uglify',
    ]);

    grunt.registerTask('default', 'build');
};
