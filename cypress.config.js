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
    requestTimeout: 10000,
    responseTimeout: 30000,
    
    video: true, // Cambiado a true para tener videos en CI
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
        const videosDir = path.join(__dirname, 'cypress', 'videos');
        
        [allureResultsDir, screenshotsDir, videosDir].forEach(dir => {
          if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
          }
          fs.mkdirSync(dir, { recursive: true });
        });

        // Crear archivo de entorno para Allure
        const environmentInfo = [
          `Browser=${details.browser?.name || 'chrome'}`,
          `Version=${details.browser?.version || 'latest'}`,
          `Platform=${details.system?.osName || process.platform}`,
          `Cypress=${details.cypressVersion || 'unknown'}`,
          `Node=${process.version}`,
          `CI=${process.env.CI || 'false'}`
        ].join('\n');

        fs.writeFileSync(
          path.join(allureResultsDir, 'environment.properties'),
          environmentInfo
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
      allureLogCypress: false,
      // Agregar variables de entorno específicas del proyecto
      baseUrl: "https://blankfactor.com"
    }
  },
  
  retries: {
    runMode: 1,
    openMode: 0
  }
});