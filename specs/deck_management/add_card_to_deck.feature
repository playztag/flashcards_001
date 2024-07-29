Feature: uadd card to deck

  As a user
  I want to add card to deck
  So that I can effectively manage my flash cards

  Scenario: Successful add card to deck
    Given I am on the deck management page
    When I perform the necessary actions to add card to deck
    Then I should see the expected result

  Scenario: Unsuccessful add card to deck
    Given I am on the deck management page
    When I perform invalid actions
    Then I should see an appropriate error message
