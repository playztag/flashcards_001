Feature: ucreate deck

  As a user
  I want to create deck
  So that I can effectively manage my flash cards

  Scenario: Successful create deck
    Given I am on the deck management page
    When I perform the necessary actions to create deck
    Then I should see the expected result

  Scenario: Unsuccessful create deck
    Given I am on the deck management page
    When I perform invalid actions
    Then I should see an appropriate error message
