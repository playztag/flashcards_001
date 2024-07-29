Feature: uview card

  As a user
  I want to view card
  So that I can effectively manage my flash cards

  Scenario: Successful view card
    Given I am on the card viewer page
    When I perform the necessary actions to view card
    Then I should see the expected result

  Scenario: Unsuccessful view card
    Given I am on the card viewer page
    When I perform invalid actions
    Then I should see an appropriate error message
