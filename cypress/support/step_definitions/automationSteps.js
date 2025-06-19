import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/pageObjects/HomePage";
import industriesPage from "../../support/pageObjects/IndustriesPage";
import retirementPage from "../../support/pageObjects/RetirementPage";

Given('I visit the BlankFactor homepage', () => {
  homePage.visit();
});

When('I accept the cookies policy', () => {
  homePage.acceptCookies();
});

When('I navigate to "Retirement and Wealth" section', () => {
  homePage.navigateToIndustries();
  industriesPage.selectRetirementAndWealth();
});

When('I scroll to the AI & Machine Learning tile', () => {
  retirementPage.scrollToAITile();
});

Then('I copy the text of the 3rd tile', () => {
  retirementPage.copyAITileText().then((text) => {
    cy.log('Texto copiado:', text);
    cy.wrap(text).as('tileText');
  });
});
Then('I click on the "Let\'s get started" button', () => {
  retirementPage.clickLetsGetStarted();
});

Then('I should see the correct URL and title', () => {
  retirementPage.verifyContactPage();
});

Then('I print the page title', () => {
  retirementPage.logPageTitle();
});