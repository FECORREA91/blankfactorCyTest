class IndustriesPage {
  elements = {
    retirementWealthLink: () => cy.get('.last-section > .container > .section-row > .col-right > .column-title').contains('a', 'Retirement and Wealth')
  };

  selectRetirementAndWealth() {
    this.elements.retirementWealthLink()
      .should('be.visible')
      .click({ force: true });
    return this;
  }

  verifyNavigation() {
    cy.url().should('include', '/industries/retirement');
    return this;
  }
}

const industriesPage = new IndustriesPage();
export default industriesPage;