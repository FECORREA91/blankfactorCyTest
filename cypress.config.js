const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalMemoryManagement: true,
    
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
    
    baseUrl: 'https://www.blankfactor.com',
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/reports/screenshots",
    trashAssetsBeforeRuns: true,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));

      on('before:run', async (details) => {
        await beforeRunHook(details);
        
        const reportsDir = path.join(__dirname, 'cypress', 'reports');
        if (fs.existsSync(reportsDir)) {
          fs.rmSync(reportsDir, { recursive: true, force: true });
        }
        fs.mkdirSync(reportsDir, { recursive: true });
      });

      on('after:run', async (results) => {
        await afterRunHook();
        return results;
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
            '--ignore-certificate-errors'
          );
        }
        
        if (browser.name === 'firefox') {
          launchOptions.args.push('--width=1920', '--height=1080');
          launchOptions.preferences = {
            'toolkit.telemetry.reportingpolicy.firstRun': false,
            'dom.ipc.processCount': 8
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
        }
      });
      
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
      detailedReporting: true
    }
  },
  
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'BlankFactor Test Report - Detallado',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    code: true,
    autoOpen: false,
    timestamp: 'yyyy-mm-dd_HH-MM-ss',
    showPassed: true,
    showFailed: true,
    showPending: true,
    showSkipped: false,
    showHooks: 'failed',
    saveJson: true,
    saveHtml: true,
    cdn: true,
    reportFilename: "[status]_[datetime]-[name]-report",
    jsonReportFilename: "[datetime]-[name]-report",
    timestampOptions: {
      format: "YYYY-MM-DD_HH-mm-ss",
      timezone: "America/Bogota"
    },

    cypressCommandLog: true,
    consoleReporter: 'spec',
    steps: true,
    featureName: true,
    scenarioName: true,
    useInlineDiffs: true,
    testStatus: true,
    testDuration: true,
    context: true,
    commands: true,
    stackTrace: true,
    groupSuites: true,
    groupTests: true,
    showEnvironment: true,
    environment: {
      viewport: '1920x1080',
      browser: 'chrome',
      baseUrl: 'https://www.blankfactor.com'
    }
  },
  
  retries: {
    runMode: 1,
    openMode: 0
  }
});