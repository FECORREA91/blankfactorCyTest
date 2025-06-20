import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/pageObjects/HomePage";
import industriesPage from "../../support/pageObjects/IndustriesPage";
import retirementPage from "../../support/pageObjects/RetirementPage";

Given('I visit the BlankFactor homepage', () => {
  cy.allure().step('Visiting BlankFactor homepage');
  homePage.visit();
});

When('I accept the cookies policy', () => {
  cy.allure().step('Accepting cookies policy');
  homePage.acceptCookies();
});

When('I navigate to "Retirement and Wealth" section', () => {
  cy.allure().step('Navigating to Retirement and Wealth section');
  homePage.navigateToIndustries();
  industriesPage.selectRetirementAndWealth();
});

When('I scroll to the AI & Machine Learning tile', () => {
  cy.allure().step('Scrolling to AI & Machine Learning tile');
  retirementPage.scrollToAITile();
});

Then('I copy the text of the 3rd tile', () => {
  cy.allure().step('Copying text of the 3rd tile');
  
  retirementPage.copyAITileText().then((text) => {
    const trimmedText = text.trim();
    cy.allure().attachment('Texto del tile', trimmedText, 'text/plain');
    cy.wrap(trimmedText).as('tileText');
  });
});

Then('I click on the "Let\'s get started" button', () => {
  cy.allure().step('Clicking "Let\'s get started" button');
  retirementPage.clickLetsGetStarted();
});

Then('I should see the correct URL and title', () => {
  cy.allure().step('Verifying URL and title');
  retirementPage.verifyContactPage();
});

Then('I print the page title', () => {
  cy.allure().step('Printing page title');
  retirementPage.logPageTitle();
});