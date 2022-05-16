const { createTestConfiguration } = require("./webpack.config");

module.exports = function (config) {
    config.set({
        basePath: '',
        exclude: [],
        files: [
            { pattern: '**/spec.js', watched: true, served: true, included: true }
        ],
        autoWatch: true,
        singleRun: false,
        failOnEmptyTestSuite: false,
        logLevel: config.LOG_WARN,
        plugins: ["karma-webpack", "karma-jasmine", "karma-chrome-launcher"],
        frameworks: ['jasmine', "webpack"],
        browsers: ['ChromeHeadless'],
        retryLimit: 0,
        browserDisconnectTimeout: 15000,
        browserNoActivityTimeout: 30000,
        captureTimeout: 60000,

        client: {
            captureConsole: false,
            clearContext: false,
            runInParent: false,
            useIframe: true,
            jasmine: {
                random: false
            }
        },

        webpack: createTestConfiguration(),
        preprocessors: {
            '**/spec.js': ['webpack'],
            '**/spec.ts': ['webpack']
        },
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only'
        },
        mochaReporter: {
            output: 'noFailures'
        }
    });
};