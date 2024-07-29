Feature: Delete a flash card
  As a user
  I want to delete a flash card
  So that I can remove unnecessary or incorrect cards from my deck

  Background:
    Given I am on the card management page
    And I have at least one existing card

  Scenario: Successfully delete a card
    When I select a card to delete
    And I click the "Delete" button
    Then I should see a confirmation dialog
    When I confirm the deletion
    Then I should see a success message
    And the card should no longer appear in my card list

  Scenario: Cancel card deletion
    When I select a card to delete
    And I click the "Delete" button
    Then I should see a confirmation dialog
    When I cancel the deletion
    Then the card should still appear in my card list

  Scenario: Delete the last card in a deck
    Given I have only one card in my deck
    When I delete the card
    Then I should see a success message
    And I should see an empty deck message
    And I should see an option to create a new card

  Scenario: Attempt to delete a card that is part of a study session
    Given I have an active study session
    When I try to delete a card that is part of the session
    Then I should see a warning message
    And I should be asked to end the study session before deleting the card