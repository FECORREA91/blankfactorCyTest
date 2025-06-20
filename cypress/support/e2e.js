import './commands';
import 'cypress-xpath';

// Configuración global de Allure
before(() => {
  cy.allure().epic('BlankFactor Automation');
  cy.allure().feature('UI Automation');
});

// Manejo unificado de excepciones
Cypress.on('uncaught:exception', (err, runnable) => {
  const ignoredErrors = [
    'ga is not defined',
    'replaceAll',
    'postMessage',
    'Cannot read properties',
    'AddFotoramaVideoEvents',
    '$ is not defined',
    'jQuery is not defined',
    'algolia',
    'algolianet',
    'RetryError',
    'Unreachable hosts',
    'application id may be incorrect',
    'cookieyes',
    'gtm'
  ];

  const shouldIgnore = ignoredErrors.some(error => 
    err.message.toLowerCase().includes(error.toLowerCase())
  );

  if (shouldIgnore) {
    cy.allure().step(`[IGNORED ERROR] ${err.message}`, 'failed');
    return false;
  }

  const errorContent = JSON.stringify({
    message: err.message,
    stack: err.stack,
    test: runnable.title
  }, null, 2);
  
  cy.allure().attachment('Unhandled Error', errorContent, 'application/json');
  return true;
});

// Hooks para Allure
beforeEach(() => {
  cy.allure().startStep(Cypress.currentTest.title);
});

afterEach(() => {
  if (Cypress.currentTest.state === 'failed') {
    const screenshotName = `${Cypress.spec.name.replace('.feature', '')}/${Cypress.currentTest.title}`;
    cy.screenshot(screenshotName, { overwrite: true });
    cy.task('readFile', `cypress/screenshots/${screenshotName}.png`).then((fileContent) => {
      cy.allure().attachment('Screenshot on failure', fileContent, 'image/png');
    });
  }
  cy.allure().endStep();
});