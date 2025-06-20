import '@shelex/cypress-allure-plugin';

Cypress.Commands.add('safeVisit', (url, options = {}) => {
  const defaultOptions = {
    onBeforeLoad(win) {
      win.__algolia = { disabled: true };
      win.AlgoliaSearch = function() {
        this.search = () => Promise.resolve({ hits: [] });
      };
      if (!win.performance) {
        win.performance = { timing: {} };
      }
    },
    timeout: 60000,
    failOnStatusCode: false
  };

  const visitWithRetry = (attempt = 0) => {
    return cy.visit(url, { ...defaultOptions, ...options })
      .then(() => {
        cy.document().its('readyState').should('eq', 'complete');
        cy.allure().step(`Visited: ${url} (Attempt ${attempt + 1})`);
      })
      .catch((err) => {
        if (attempt < 2) {
          cy.allure().step(`Retrying visit (Attempt ${attempt + 1})`, 'failed');
          return visitWithRetry(attempt + 1);
        }
        cy.allure().attachment('safeVisit Error', JSON.stringify({
          url,
          error: err.message,
          stack: err.stack
        }, null, 2), 'application/json');
        throw err;
      });
  };

  return visitWithRetry();
});

Cypress.Commands.add('setupRequestInterception', () => {
  cy.intercept('**', (req) => {
    req.on('response', (res) => {
      if (res.statusCode >= 400) {
        cy.allure().attachment(
          `Request ${req.method} ${req.url}`,
          JSON.stringify({
            status: res.statusCode,
            request: { 
              url: req.url, 
              method: req.method,
              headers: req.headers,
              body: req.body
            },
            response: { 
              status: res.statusCode,
              headers: res.headers,
              body: res.body
            }
          }, null, 2),
          'application/json'
        );
      }
    });
  });
});