Feature: Edit an existing flash card
  As a user
  I want to edit an existing flash card
  So that I can update or correct its content

  Background:
    Given I am on the card editor page
    And I have an existing card with content

  Scenario: Edit text on an existing card
    When I select the existing card
    And I modify the text on Side A to "Updated question"
    And I modify the text on Side B to "Updated answer"
    And I click "Save Changes"
    Then I should see a success message
    And the card should be updated with the new content

  Scenario: Add a shape to an existing card
    When I select the existing card
    And I add a triangle to Side A
    And I click "Save Changes"
    Then I should see a success message
    And the card should be updated with the new shape

  Scenario: Change colors on an existing card
    When I select the existing card
    And I change the background color of Side A to green
    And I change the text color of Side B to red
    And I click "Save Changes"
    Then I should see a success message
    And the card should be updated with the new colors

  Scenario: Attempt to save a card with empty content
    When I select the existing card
    And I delete all content from Side A
    And I click "Save Changes"
    Then I should see an error message "Card must have content on both sides"
    And the card should not be updated

  Scenario: Cancel editing a card
    When I select the existing card
    And I modify the text on Side A
    And I click "Cancel"
    Then I should see a confirmation dialog
    When I confirm the cancellation
    Then the card should not be updated
    And I should return to the card list view

  Background:
    Given I am on the card editor page
    And I am viewing the "Physics" deck with existing cards

  Scenario: Edit both sides of an existing card
    When I select "Card 1: Newton's First Law" from the card list
    Then I should see Side A and Side B of the card displayed side by side
    When I modify the text on Side A to "Updated question"
    And I modify the text on Side B to "Updated answer"
    And I click "Save"
    Then I should see a success message
    And the card should be updated with the new content on both sides

  Scenario: Add shapes to both sides of a card
    When I select an existing card from the list
    And I add a rectangle to Side A
    And I add a circle to Side B
    Then I should see the shapes on their respective sides simultaneously

  Scenario: Undo changes on one side
    When I select an existing card from the list
    And I make changes to Side A
    And I click the undo button for Side A
    Then only the changes on Side A should be undone
    And Side B should remain unchanged

    Feature: Edit an existing flash card

  Background:
    Given I am on the card editor page
    And I am viewing the "Physics" deck with existing cards

  Scenario: Edit both sides of an existing card
    When I select "Card 1: Newton's First Law" from the card list
    Then I should see Side A and Side B of the card displayed side by side
    When I modify the text on Side A to "Updated question"
    And I modify the text on Side B to "Updated answer"
    And I click "Save"
    Then I should see a success message
    And the card should be updated with the new content on both sides

  Scenario: Add shapes to both sides of a card
    When I select an existing card from the list
    And I add a rectangle to Side A
    And I add a circle to Side B
    Then I should see the shapes on their respective sides simultaneously

  Scenario: Undo changes on one side
    When I select an existing card from the list
    And I make changes to Side A
    And I click the undo button for Side A
    Then only the changes on Side A should be undone
    And Side B should remain unchanged