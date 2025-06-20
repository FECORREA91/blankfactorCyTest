import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/pageObjects/HomePage";
import industriesPage from "../../support/pageObjects/IndustriesPage";
import retirementPage from "../../support/pageObjects/RetirementPage";

Given('I visit the BlankFactor homepage', () => {
  cy.allure().step('I visit the BlankFactor homepager');
  homePage.visit();
});

When('I accept the cookies policy', () => {
  cy.allure().step('I accept the cookies policy');
  homePage.acceptCookies();
});

When('I navigate to "Retirement and Wealth" section', () => {
  cy.allure().step('I navigate to "Retirement and Wealth" section');
  homePage.navigateToIndustries();
  industriesPage.selectRetirementAndWealth();
});

When('I scroll to the AI & Machine Learning tile', () => {
  cy.allure().step('I scroll to the AI & Machine Learning tile');
  retirementPage.scrollToAITile();
});

Then('I copy the text of the 3rd tile', () => {
  cy.allure().step('I copy the text of the 3rd tile');
  retirementPage.copyAITileText().then((text) => {
    cy.allure().attachment('Texto del tile', text, 'text/plain');
    cy.wrap(text).as('tileText');
  });
});

Then('I click on the "Let\'s get started" button', () => {
  cy.allure().step('I click on the "Let\'s get started" button');
  retirementPage.clickLetsGetStarted();
});

Then('I should see the correct URL and title', () => {
  cy.allure().step('I should see the correct URL and title');
  retirementPage.verifyContactPage();
});

Then('I print the page title', () => {
  cy.allure().step('I print the page title');
  retirementPage.logPageTitle();
});