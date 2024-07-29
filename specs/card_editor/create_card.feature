Feature: Create a new flash card
  As a user
  I want to create a new flash card
  So that I can add content to my study decks

  Background:
    Given I am on the card editor page

  Scenario: Successfully create a basic flash card
    When I click on "New Card"
    And I add text "What is the capital of France?" to Side A
    And I add text "Paris" to Side B
    And I click "Save Card"
    Then I should see a success message
    And the new card should appear in my card list

  Scenario: Create a card with shapes and text
    When I click on "New Card"
    And I add a rectangle to Side A
    And I add text "Shape:" inside the rectangle on Side A
    And I add a circle to Side B
    And I add text "Circle" inside the circle on Side B
    And I click "Save Card"
    Then I should see a success message
    And the new card should appear in my card list with shapes and text

  Scenario: Attempt to create an empty card
    When I click on "New Card"
    And I click "Save Card" without adding any content
    Then I should see an error message "Card must have content on both sides"

  Scenario: Create a card with custom colors
    When I click on "New Card"
    And I add text "Color question" to Side A
    And I change the text color to blue on Side A
    And I add text "Blue" to Side B
    And I change the background color to blue on Side B
    And I click "Save Card"
    Then I should see a success message
    And the new card should appear in my card list with custom colors

Background:
  Given I am on the card editor page
  And I am viewing the "Physics" deck with 15 existing cards

Scenario: Successfully create a new flash card
  When I click on "Create New Card"
  And I add text "What is the speed of light?" to Side A
  And I add text "299,792,458 meters per second" to Side B
  And I click "Save"
  Then I should see a success message
  And the card list should update to show 16 cards
  And the new card should appear at the bottom of the card list

Scenario: View newly created card in the list
  When I create a new card with the question "What is Newton's Second Law?"
  Then I should see the new card in the card list
  And the card count should increase by 1

Scenario: Edit both sides simultaneously
  When I create a new card
  Then I should be able to edit Side A and Side B simultaneously
  And changes on one side should not affect the other side

Scenario: View newly created card in the list
  When I create a new card with the question "What is Newton's Second Law?" on Side A
  And I add the answer "F = ma" on Side B
  Then I should see the new card in the card list
  And the card count should increase by 1


  Feature: Create a new flash card

  Background:
    Given I am on the card editor page
    And I am viewing the "Physics" deck with 15 existing cards

  Scenario: Successfully create a new flash card
    When I click on "Create New Card"
    Then I should see two empty canvases labeled "Side A" and "Side B"
    When I add text "What is the speed of light?" to Side A
    And I add text "299,792,458 meters per second" to Side B
    And I click "Save"
    Then I should see a success message
    And the card list should update to show 16 cards
    And the new card should appear at the bottom of the card list

  Scenario: Edit both sides simultaneously
    When I create a new card
    Then I should be able to edit Side A and Side B simultaneously
    And changes on one side should not affect the other side

  Scenario: View newly created card in the list
    When I create a new card with the question "What is Newton's Second Law?" on Side A
    And I add the answer "F = ma" on Side B
    Then I should see the new card in the card list
    And the card count should increase by 1