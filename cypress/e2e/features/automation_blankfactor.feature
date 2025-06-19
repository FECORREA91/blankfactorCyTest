Feature: Automate BlankFactor website

  Scenario: Navigate and verify elements
    Given I visit the BlankFactor homepage
    When I accept the cookies policy
    And I navigate to "Retirement and Wealth" section
    And I scroll to the AI & Machine Learning tile
    Then I copy the text of the 3rd tile
    And I click on the "Let's get started" button
    Then I should see the correct URL and title
    And I print the page title
