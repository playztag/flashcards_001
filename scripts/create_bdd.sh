#!/bin/bash

# Define the base directory
BASE_DIR="flash-card-creator"

# Create the specs directory
mkdir -p "$BASE_DIR/specs"

# Function to create feature file
create_feature_file() {
    local feature=$1
    local scenario=$2
    local file_path="$BASE_DIR/specs/$feature/${scenario}.feature"
    
    cat << EOF > "$file_path"
Feature: $(echo $scenario | sed 's/_/ /g' | sed 's/.*/\u&/')

  As a user
  I want to $(echo $scenario | sed 's/_/ /g')
  So that I can effectively manage my flash cards

  Scenario: Successful $(echo $scenario | sed 's/_/ /g')
    Given I am on the $(echo $feature | sed 's/_/ /g') page
    When I perform the necessary actions to $(echo $scenario | sed 's/_/ /g')
    Then I should see the expected result

  Scenario: Unsuccessful $(echo $scenario | sed 's/_/ /g')
    Given I am on the $(echo $feature | sed 's/_/ /g') page
    When I perform invalid actions
    Then I should see an appropriate error message
EOF

    echo "Created $file_path"
}

# Create feature directories and files
create_feature_files() {
    local feature=$1
    shift
    local scenarios=("$@")
    
    mkdir -p "$BASE_DIR/specs/$feature"
    
    for scenario in "${scenarios[@]}"; do
        create_feature_file "$feature" "$scenario"
    done
}

# Define features and their scenarios
create_feature_files "card_editor" "create_card" "edit_card" "delete_card"
create_feature_files "card_viewer" "view_card" "flip_card"
create_feature_files "deck_management" "create_deck" "edit_deck" "delete_deck" "add_card_to_deck" "remove_card_from_deck"
create_feature_files "study_mode" "start_study_session" "track_progress" "review_cards"
create_feature_files "esp32_code_generation" "generate_card_code" "generate_deck_code"

echo "BDD structure and placeholder .feature files have been generated."