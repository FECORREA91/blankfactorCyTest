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
    
    defaultCommandTimeout: 20000,
    execTimeout: 60000,
    pageLoadTimeout: 60000,
    
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    trashAssetsBeforeRuns: true,

    async setupNodeEvents(on, config) {
      // Configurar Cucumber primero
      await addCucumberPreprocessorPlugin(on, config);
      
      // Configurar el preprocesador de features
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));

      // Configurar Allure después de Cucumber
      allureWriter(on, config);

      // Limpieza de directorios
      on('before:run', async (details) => {
        const allureResultsDir = path.join(__dirname, 'allure-results');
        const screenshotsDir = path.join(__dirname, 'cypress', 'screenshots');
        
        [allureResultsDir, screenshotsDir].forEach(dir => {
          if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
          }
          fs.mkdirSync(dir, { recursive: true });
        });

        // Crear archivo de entorno para Allure
        fs.writeFileSync(
          path.join(allureResultsDir, 'environment.properties'),
          `Browser=${details.browser.name}\n` +
          `Version=${details.browser.version}\n` +
          `Platform=${details.system.osName}\n` +
          `Cypress=${details.cypressVersion}\n`
        );
      });

      // Tareas adicionales
      on('task', {
        log: (message) => {
          console.log(message);
          return null;
        },
        readFile: (filePath) => {
          return fs.readFileSync(filePath, 'utf8');
        }
      });

      return config;
    },
    
    specPattern: "cypress/e2e/features/**/*.feature",
    
    env: {
      allure: true,
      allureReuseAfterSpec: true,
      allureAttachRequests: false,
      allureResultsPath: "allure-results",
      allureCleanSkippedTests: true,
      allureAddCucumberSteps: true,
      allureLogCypress: false
    }
  },
  
  retries: {
    runMode: 1,
    openMode: 0
  }
});