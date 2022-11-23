const { BrowserFetcher } = require("puppeteer");
const { createTestConfiguration } = require("./webpack.config");

async function fetchChrome() {
    const ChromiumRevision = require('puppeteer-core/lib/cjs/puppeteer/revisions.js').PUPPETEER_REVISIONS.chromium;
    const browserFetcher = new BrowserFetcher({path: './temp/browser',product: "chrome"});    
    const revisionInfo = await browserFetcher.download(ChromiumRevision);
    process.env.CHROME_BIN = revisionInfo.executablePath
}

module.exports = async function (config) {
    await fetchChrome();
    config.set({
        basePath: '',
        exclude: [],
        files: [
            { pattern: '**/spec.js', watched: true, served: true, included: true }
        ],
        autoWatch: true,
        singleRun: true,
        failOnEmptyTestSuite: false,
        logLevel: config.LOG_WARN,
        plugins: ["karma-webpack", "karma-jasmine", "karma-chrome-launcher"],
        frameworks: ['jasmine', "webpack"],
        browsers: ['puppeteerChrome'],
        customLaunchers: {
            puppeteerChrome: {
                base: "ChromeHeadless",
                flags: ["--disable-extensions","--no-sandbox"],
            }
        },
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