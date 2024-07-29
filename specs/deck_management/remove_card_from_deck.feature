Feature: uremove card from deck

  As a user
  I want to remove card from deck
  So that I can effectively manage my flash cards

  Scenario: Successful remove card from deck
    Given I am on the deck management page
    When I perform the necessary actions to remove card from deck
    Then I should see the expected result

  Scenario: Unsuccessful remove card from deck
    Given I am on the deck management page
    When I perform invalid actions
    Then I should see an appropriate error message
