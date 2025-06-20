class RetirementPage {
  elements = {
    aiMachineLearningTile: () => cy.get('div.card-wrapper').eq(2).should('exist'),
    letsGetStartedBtn: () => cy.contains('a', "Let's get started").should('exist'),
    pageTitle: () => cy.title()
  };

  scrollToAITile() {
    return this.elements.aiMachineLearningTile()
      .scrollIntoView()
      .should('be.visible');
  };

  copyAITileText() {
    return this.elements.aiMachineLearningTile()
      .invoke('text')
      .then(text => text.trim());
  };
  
  clickLetsGetStarted() {
    return this.elements.letsGetStartedBtn()
      .should('be.visible')
      .click({ force: true });
  }

  verifyContactPage() {
    cy.url().should('include', '/contact');
    return this.elements.pageTitle()
      .should('include', 'Contact | Blankfactor');
  }

  logPageTitle() {
    return this.elements.pageTitle()
      .then(title => {
        cy.log(`Page Title: ${title}`);
      });
  }
}

const retirementPage = new RetirementPage();
export default retirementPage;