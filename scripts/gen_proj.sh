#!/bin/bash

# Function to create a file with metadata
create_file() {
    local file_path=$1
    local file_name=$(basename "$file_path" .md)
    local directory=$(dirname "$file_path")
    
    mkdir -p "$directory"
    
    cat > "$file_path" <<EOL
# ${file_name}

## Purpose
[Briefly describe the purpose of this file/component]

## Dependencies
- [List any dependencies]

## Props (if applicable)
- [List props and their types]

## Main Functionality
[Describe the main functionality or responsibilities]

## TODO
- [ ] Implement basic structure
- [ ] Add necessary logic
- [ ] Write unit tests
EOL

    echo "Created $file_path"
}

# Create root directory
mkdir -p flash-card-creator
cd flash-card-creator

# Create public directory and files
mkdir -p public
touch public/index.html public/manifest.json public/robots.txt

# Create src directory and its subdirectories
mkdir -p src/{components/{common,layout,cards,decks,study},pages,hooks,context,services,utils,types,styles,constants}

# Create components
for file in Button Input Modal ColorPicker; do
    create_file "src/components/common/${file}.md"
done

for file in Header Footer Sidebar; do
    create_file "src/components/layout/${file}.md"
done

for file in CardEditor CardViewer CardList; do
    create_file "src/components/cards/${file}.md"
done

for file in DeckManager DeckList DeckItem; do
    create_file "src/components/decks/${file}.md"
done

for file in StudyMode ProgressTracker; do
    create_file "src/components/study/${file}.md"
done

# Create pages
for file in Home Editor DeckManagement Study; do
    create_file "src/pages/${file}.md"
done

# Create hooks
for file in useCanvas useDeck useStudySession; do
    create_file "src/hooks/${file}.md"
done

# Create context
for file in ThemeContext AppStateContext; do
    create_file "src/context/${file}.md"
done

# Create services
for file in api storage codeGenerator; do
    create_file "src/services/${file}.md"
done

# Create utils
for file in shapes colorUtils validators; do
    create_file "src/utils/${file}.md"
done

# Create types
for file in Card Deck Shape; do
    create_file "src/types/${file}.md"
done

# Create styles
for file in theme globalStyles; do
    create_file "src/styles/${file}.md"
done

# Create constants
create_file "src/constants/appConstants.md"

# Create main App and index files
create_file "src/App.md"
create_file "src/index.md"

# Create test directories
mkdir -p tests/{unit/{components,hooks,utils},integration,e2e}

# Create scripts directory
mkdir -p scripts
create_file "scripts/generate-esp32-code.md"

# Create config directory
mkdir -p config
create_file "config/webpack.config.md"

# Create root files
touch .gitignore package.json tsconfig.json README.md CHANGELOG.md

echo "Project structure created successfully!"