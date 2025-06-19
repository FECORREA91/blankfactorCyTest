import 'cypress-xpath';
import './commands';

// Manejo unificado y mejorado de excepciones no controladas en Cypress
Cypress.on('uncaught:exception', (err) => {
  const ignoredErrors = [
    ...(Cypress.env('filterErrorMessages') || []),
    // Errores específicos a ignorar
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
    'application id may be incorrect'
  ];

  const shouldIgnore = ignoredErrors.some(error =>
    err.message.toLowerCase().includes(error.toLowerCase())
  );

  if (shouldIgnore) {
    console.log('[Cypress] Error ignorado:', err.message);
    return false; // Ignorar el error y continuar
  }

  console.error('[Cypress] Error no manejado:', err.message);
  return true; // Permitir que Cypress falle la prueba
});

// Polyfill mejorado con manejo de red
beforeEach(() => {
  cy.window().then((win) => {
    if (!win.performance) {
      win.performance = { timing: {} };
    }
    
    win.addEventListener('error', (event) => {
      const algoliaUrls = ['algolia.net', 'algolianet.com'];
      const isAlgoliaError = algoliaUrls.some(url => 
        event.message?.includes(url) || 
        event.filename?.includes(url)
      );
      
      if (isAlgoliaError) {
        event.preventDefault();
        cy.task('log', `[Window] Error de Algolia ignorado: ${event.message}`);
      }
    });
  });
});