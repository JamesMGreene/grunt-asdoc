/*
 * grunt-asdoc
 * https://github.com/JamesMGreene/grunt-asdoc
 *
 * Copyright (c) 2014 James M. Greene
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var os = require('os');
  var tmpDir = typeof os.tmpdir === 'function' ? os.tmpdir() : os.tmpDir();

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      options: {
        // `force: true` is required to delete files outside of the current working directory
        force: true
      },
      tests: [
        tmpDir + '/docs1/',
        tmpDir + '/docs2/',
        tmpDir + '/docs3/'
      ]
    },

    // Configuration to be run (and then tested).
    asdoc: {
      options: {
        output: tmpDir + '/docs1/'
      },
      testDocSuccess: {
        options: {
          rawConfig: '-source-path test/testData/'
        },
        src: ['test/testData/testApp.as']
      },
      testDocSuccessOverrideDest: {
        options: {
          docSources: ['test/testData/testApp.as']
        },
        dest: tmpDir + '/docs2/'
      },
      testDocFailureDueToSynaxError: {
        options: {
          // `force: true` is required to not fail the Grunt run (as we KNOW this one should cause an error)
          force: true
        },
        src: ['test/testData/errorApp.as'],
        dest: tmpDir + '/docs3/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/**/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('default', ['jshint', 'clean', 'asdoc', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('travis', ['jshint', 'clean', 'asdoc', 'nodeunit', 'clean']);

};
