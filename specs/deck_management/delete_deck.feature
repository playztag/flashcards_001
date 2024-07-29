Feature: Delete a deck
  As a user
  I want to delete a deck
  So that I can remove unnecessary or outdated collections of cards

  Background:
    Given I am on the deck management page
    And I have at least one existing deck

  Scenario: Successfully delete a deck
    When I select a deck to delete
    And I click the "Delete Deck" button
    Then I should see a confirmation dialog
    When I confirm the deletion
    Then I should see a success message
    And the deck should no longer appear in my deck list

  Scenario: Cancel deck deletion
    When I select a deck to delete
    And I click the "Delete Deck" button
    Then I should see a confirmation dialog
    When I cancel the deletion
    Then the deck should still appear in my deck list

  Scenario: Delete a deck with cards
    Given I have a deck "Physics Formulas" with 10 cards
    When I delete the "Physics Formulas" deck
    Then I should see a warning message about deleting all associated cards
    When I confirm the deletion
    Then I should see a success message
    And the "Physics Formulas" deck and its cards should be removed from my account

  Scenario: Attempt to delete the last deck
    Given I have only one deck in my account
    When I try to delete the deck
    Then I should see a warning message
    And I should be asked to create a new deck before deleting the last one