class RetirementPage {
  elements = {
    aiMachineLearningTile: () => cy.get('.tiles-container .tile').eq(2),
    letsGetStartedBtn: () => cy.contains('a', "Let's get started"),
    pageTitle: () => cy.title()
  };

  scrollToAITile() {
    this.elements.aiMachineLearningTile()
      .scrollIntoView()
      .should('be.visible');
    return this;
  }

  copyAITileText() {
    return this.elements.aiMachineLearningTile()
      .trigger('mouseover')
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim();
        cy.task('log', `AI & Machine Learning Tile Text: ${trimmedText}`);
        return trimmedText;
      });
  }

  clickLetsGetStarted() {
    this.elements.letsGetStartedBtn()
      .should('be.visible')
      .click({ force: true });
    return this;
  }

  verifyContactPage() {
    cy.url().should('include', '/contact');
    this.elements.pageTitle().should('include', 'Contact Us');
    return this;
  }

  logPageTitle() {
    this.elements.pageTitle()
      .then(title => cy.task('log', `Page Title: ${title}`));
    return this;
  }
}

const retirementPage = new RetirementPage();
export default retirementPage;