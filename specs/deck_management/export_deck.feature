Feature: Export deck to JSON
  As a user
  I want to export my deck to a JSON file
  So that I can backup my work or share it with others

  Background:
    Given I am on the deck management page
    And I have a deck named "Physics" with 15 existing cards

  Scenario: Successfully export deck to JSON
    When I select the "Physics" deck
    And I click the "Export to JSON" button
    Then a JSON file should be downloaded
    And the file should be named "Physics_deck.json"
    And the JSON file should contain all 15 cards with their content

  Scenario: Export deck with complex elements
    Given I have a deck with cards containing text and shapes
    When I export the deck to JSON
    Then the JSON file should include all elements of each card
    And the positioning and styling of elements should be preserved

  Scenario: Validate exported JSON
    When I export a deck to JSON
    And I import the JSON file back into the application
    Then all cards should be recreated exactly as they were before export

  Scenario: Export empty deck
    Given I have an empty deck named "New Deck"
    When I select the "New Deck"
    And I click the "Export to JSON" button
    Then a JSON file named "New_Deck.json" should be downloaded
    And the JSON file should contain an empty array of cards