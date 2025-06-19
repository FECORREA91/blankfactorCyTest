const path = require('path');
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    // Tamaño de pantalla aumentado (Full HD)
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // Configuración para forzar tamaño en todos los navegadores
    experimentalSessionAndOrigin: true,
    
    // Configuración base
    baseUrl: 'https://www.blankfactor.com',
    
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));

      allureWriter(on, config);
      
      // Configuración adicional para pantalla completa
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--start-maximized');
          launchOptions.args.push('--window-size=1920,1080');
        }
        
        if (browser.name === 'firefox') {
          launchOptions.args.push('--width=1920');
          launchOptions.args.push('--height=1080');
        }
        
        return launchOptions;
      });
      
      return config;
    },
    
    specPattern: "cypress/e2e/features/**/*.feature",
    chromeWebSecurity: false,
    defaultCommandTimeout: 15000,
    
    env: {
      allure: true,
      allureReuseAfterSpec: true,
      allureAttachRequests: true,
      screenSize: '1920x1080'
    }
  },
  
  reporter: '@shelex/cypress-allure-plugin/reporter',
  reporterOptions: {
    resultsDir: 'allure-results',
    useCucumberStepReporter: true
  }
});