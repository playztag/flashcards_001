Feature: Generate ESP32 code for a single card
  As a user
  I want to generate ESP32 code for a single flash card
  So that I can implement it on my ESP32 device

  Background:
    Given I am on the code generation page
    And I have selected a card to generate code for

  Scenario: Generate code for a text-only card
    Given the selected card has only text content
    When I click "Generate ESP32 Code"
    Then I should see C++ code for displaying the card's text content
    And the code should include functions for both Side A and Side B

  Scenario: Generate code for a card with shapes and text
    Given the selected card has shapes and text
    When I click "Generate ESP32 Code"
    Then I should see C++ code for drawing the shapes and displaying the text
    And the code should use appropriate ESP32 graphics library functions

  Scenario: Generate code with color information
    Given the selected card has custom colors
    When I click "Generate ESP32 Code"
    Then I should see C++ code that includes color definitions
    And the generated code should use the custom colors for shapes and text

  Scenario: Copy generated code to clipboard
    When I click "Generate ESP32 Code"
    And I click "Copy to Clipboard"
    Then the generated code should be copied to my clipboard
    And I should see a confirmation message