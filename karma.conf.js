// Karma configuration
// Generated on Tue Aug 20 2013 09:18:37 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'vendor/jquery/jquery.min.js',
      'vendor/parser/build/parser.js',
      'vendor/jasmine-only.js',

      'lib/monkey_patches.coffee',
      'lib/errors.coffee',
      'lib/group.coffee',
      'lib/validatable_input.coffee',
      'lib/range_validation.coffee',
      'lib/character_count_validation.coffee',
      'lib/word_count_validation.coffee',
      'lib/validator.coffee',

      'spec/helpers/*.js',
      'spec/lib/*_spec.coffee'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome', 'Safari', 'Firefox', 'Opera'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
