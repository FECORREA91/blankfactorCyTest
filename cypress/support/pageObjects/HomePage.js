class HomePage {
  constructor() {
    this.url = 'https://www.blankfactor.com';
  }

  elements = {
    acceptCookiesBtn: () => cy.get('.cky-notice-btn-wrapper > .cky-btn-accept').should('exist'),
    industriesMenu: () => cy.get('#menu-item-4871 > [href="https://blankfactor.com/industries/"]').should('exist'),
    pageTitle: () => cy.title()
  };

  visit() {
    return cy.visit(this.url, {
      failOnStatusCode: false,
      timeout: 50000
    });
  }

  acceptCookies() {
    return this.elements.acceptCookiesBtn()
      .should('be.visible')
      .click({ force: true });
  }

  navigateToIndustries() {
    return this.elements.industriesMenu()
      .should('be.visible')
      .click({ force: true });
  }

  verifyPageTitle(expectedTitle) {
    return this.elements.pageTitle()
      .should('include', expectedTitle);
  }
}

const homePage = new HomePage();
export default homePage;