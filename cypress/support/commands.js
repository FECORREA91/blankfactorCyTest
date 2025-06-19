Cypress.Commands.add('safeVisit', (url, options = {}) => {
  const defaultOptions = {
    onBeforeLoad(win) {
      win.__algolia = { disabled: true };
      win.AlgoliaSearch = function() {
        this.search = () => Promise.resolve({ hits: [] });
      };
    },
    timeout: 60000
  };


  const visitWithRetry = (attempt = 0) => {
    return cy.visit(url, { ...defaultOptions, ...options })
      .catch((err) => {
        if (attempt < 2) {
          return visitWithRetry(attempt + 1);
        }
        throw err;
      });
  };

  return visitWithRetry();
});