Feature: uflip card

  As a user
  I want to flip card
  So that I can effectively manage my flash cards

  Scenario: Successful flip card
    Given I am on the card viewer page
    When I perform the necessary actions to flip card
    Then I should see the expected result

  Scenario: Unsuccessful flip card
    Given I am on the card viewer page
    When I perform invalid actions
    Then I should see an appropriate error message
