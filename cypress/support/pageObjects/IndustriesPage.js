class IndustriesPage {
  elements = {
    retirementWealthLink: () => cy.contains('h3', 'Retirement and Wealth').should('exist'),
    learnMoreBtn: () => cy.get('a[title="Learn More"]').should('exist')
  };

  selectRetirementAndWealth() {
    this.elements.retirementWealthLink()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    return this.elements.learnMoreBtn()
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  verifyNavigation() {
    return cy.url().should('include', '/industries/retirement');
  }
}

const industriesPage = new IndustriesPage();
export default industriesPage;