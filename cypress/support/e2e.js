import '@shelex/cypress-allure-plugin';
import 'cypress-xpath';
import './commands';

// Manejo global de excepciones no críticas
Cypress.on('uncaught:exception', (err) => {
  const ignoredErrors = Cypress.env('filterErrorMessages') || [];
  
  if (ignoredErrors.some(error => err.message.includes(error))) {
    console.log('Error ignorado:', err.message);
    return false;
  }
  return true;
});

// Polyfill para asegurar compatibilidad
before(() => {
  cy.window().then(win => {
    if (!win.performance) {
      win.performance = { timing: {} };
    }
    win.addEventListener('unload', () => {});
  });
});