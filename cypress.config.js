const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const fs = require('fs');
const path = require('path');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalMemoryManagement: true,
    experimentalInteractiveRunEvents: true,
    
    blockHosts: [
      "*.algolia.net",
      "*.algolianet.com",
      "*.google-analytics.com",
      "*.googletagmanager.com",
      "*.facebook.com",
      "*.linkedin.com"
    ],
    
    defaultCommandTimeout: 20000,
    execTimeout: 60000,
    taskTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    numTestsKeptInMemory: 5,
    
    baseUrl: 'https://www.blankfactor.com',
    chromeWebSecurity: false,
    video: true,
    videoCompression: 32,
    videoUploadOnPasses: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/allure-results",
    videosFolder: "cypress/allure-results/videos",
    trashAssetsBeforeRuns: true,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));

      on('before:run', async () => {
        const reportsDir = path.join(__dirname, 'cypress', 'allure-results');
        if (fs.existsSync(reportsDir)) {
          fs.rmSync(reportsDir, { recursive: true, force: true });
        }
        fs.mkdirSync(reportsDir, { recursive: true });
      });

      on('after:spec', (spec, results) => {
        if (results && results.video) {
          const failures = results.tests.some((test) => 
            test.attempts.some((attempt) => attempt.state === 'failed')
          );
          if (!failures) {
            fs.unlinkSync(results.video);
          }
        }
      });

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push(
            '--start-maximized',
            '--window-size=1920,1080',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            '--disable-gpu',
            '--disable-extensions',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--ignore-certificate-errors',
            '--allow-running-insecure-content',
            '--disable-web-security'
          );
        }
        
        if (browser.name === 'firefox') {
          launchOptions.args.push('--width=1920', '--height=1080');
          launchOptions.preferences = {
            'toolkit.telemetry.reportingpolicy.firstRun': false,
            'dom.ipc.processCount': 8,
            'network.cookie.cookieBehavior': 0
          };
        }
        
        return launchOptions;
      });
      
      on('task', {
        log: (message) => {
          console.log(message);
          return null;
        },
        error: (message) => {
          console.error(message);
          return null;
        },
        logStep: (message) => {
          console.log(`[STEP]: ${message}`);
          return null;
        },
        logScenario: (message) => {
          console.log(`[SCENARIO]: ${message}`);
          return null;
        },
        logFeature: (message) => {
          console.log(`[FEATURE]: ${message}`);
          return null;
        },
        allureLogStep: (message) => {
          const allure = require('allure-cypress/reporter');
          allure.step(message);
          return null;
        }
      });
      
      allureWriter(on, config);
      
      return config;
    },
    
    specPattern: "cypress/e2e/features/**/*.feature",
    excludeSpecPattern: [
      "*.hot-update.js",
      "**/__snapshots__/*",
      "**/__image_snapshots__/*"
    ],
    
    env: {
      screenSize: '1920x1080',
      filterErrorMessages: [
        "Algolia",
        "RetryError",
        "Unreachable hosts",
        "application id may be incorrect",
        "cookieyes",
        "gtm"
      ],
      grepFilterSpecs: true,
      grepOmitFiltered: true,
      omitFiltered: true,
      filterSpecs: true,
      showFullDescription: true,
      detailedReporting: true,
      allure: true,
      allureReuseAfterSpec: true,
      allureAttachRequests: true,
      allureAddVideoOnPass: false,
      allureClearSkippedTests: true,
      allureAddAnalyticLabels: true,
      allureLogCypress: true
    }
  },
  
  retries: {
    runMode: 1,
    openMode: 0
  }
});