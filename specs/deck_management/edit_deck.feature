Feature: Edit an existing deck
  As a user
  I want to edit an existing deck
  So that I can update its name, description, or organization

  Background:
    Given I am on the deck management page
    And I have an existing deck named "History Dates"

  Scenario: Edit deck name and description
    When I select the "History Dates" deck
    And I click "Edit Deck"
    And I change the name to "Important Historical Events"
    And I update the description to "Key dates and events in world history"
    And I click "Save Changes"
    Then I should see a success message
    And the deck should be updated with the new name and description

  Scenario: Add tags to an existing deck
    When I select the "History Dates" deck
    And I click "Edit Deck"
    And I add tags "history, dates, academic"
    And I click "Save Changes"
    Then I should see a success message
    And the deck should be updated with the new tags

  Scenario: Reorder cards within a deck
    Given the "History Dates" deck has at least 3 cards
    When I select the "History Dates" deck
    And I click "Edit Deck"
    And I drag the third card to the first position
    And I click "Save Changes"
    Then I should see a success message
    And the cards in the deck should be in the new order

  Scenario: Attempt to save a deck with an empty name
    When I select the "History Dates" deck
    And I click "Edit Deck"
    And I delete the deck name
    And I click "Save Changes"
    Then I should see an error message "Deck name cannot be empty"
    And the deck should not be updated