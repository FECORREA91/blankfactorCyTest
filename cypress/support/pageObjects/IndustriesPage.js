class IndustriesPage {
  elements = {
    retirementWealthLink: () => cy.contains('h3', ' Retirement and Wealth'),
    learnMoreBtn: () => cy.get('a[title="Learn More"]')
  };

  selectRetirementAndWealth() {
    this.elements.retirementWealthLink()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    this.elements.learnMoreBtn()
      .scrollIntoView()
      .should('be.visible')
      .click();
    
    return this;
  }

  verifyNavigation() {
    cy.url().should('include', '/industries/retirement');
    return this;
  }
}

const industriesPage = new IndustriesPage();
export default industriesPage;