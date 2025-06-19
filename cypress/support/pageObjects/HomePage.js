class HomePage {
  constructor() {
    this.url = 'https://www.blankfactor.com';
  }

  elements = {
    acceptCookiesBtn: () => cy.get('.cky-notice-btn-wrapper > .cky-btn-accept'),
    industriesMenu: () => cy.get('#menu-item-4871 > [href="https://blankfactor.com/industries/"]'),
    pageTitle: () => cy.title()
  };

  visit() {
    cy.visit(this.url, {
      failOnStatusCode: false,
      timeout: 50000
    });
    return this;
  }

  acceptCookies() {
    this.elements.acceptCookiesBtn()
      .should('be.visible')
      .click({ force: true });
    return this;
  }

  navigateToIndustries() {
    this.elements.industriesMenu()
      .should('be.visible')
      .click({ force: true });
    return this;
  }

  verifyPageTitle(expectedTitle) {
    this.elements.pageTitle()
      .should('include', expectedTitle);
    return this;
  }
}

const homePage = new HomePage();
export default homePage;