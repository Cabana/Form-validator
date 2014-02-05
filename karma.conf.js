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
      'vendor/Array.filter.polyfill.js',

      'lib/monkey_patches.js',
      'lib/errors.js',
      'lib/group.js',
      'lib/validatable_input.js',
      'lib/range_validation.js',
      'lib/character_count_validation.js',
      'lib/word_count_validation.js',
      'lib/validator.js',

      'spec/helpers/*.js',
      'spec/lib/*_spec.js'
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
    // browsers: ['Chrome', 'Safari', 'Firefox'],
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
