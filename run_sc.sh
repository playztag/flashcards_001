#!/bin/bash

# Ensure we're in the project root
if [ ! -d "./src" ] || [ ! -f "./package.json" ]; then
    echo "Error: This script must be run from the project root directory."
    exit 1
fi

# Create Cypress ESLint configuration
mkdir -p cypress
cat << EOF > cypress/.eslintrc.json
{
  "extends": [
    "plugin:cypress/recommended"
  ],
  "plugins": [
    "cypress"
  ],
  "env": {
    "cypress/globals": true
  },
  "rules": {
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error"
  }
}
EOF

echo "Created Cypress ESLint configuration."

# Install ESLint plugin for Cypress
npm install --save-dev eslint-plugin-cypress

echo "Installed eslint-plugin-cypress."

# Create or update Cypress configuration
cat << EOF > cypress.json
{
  "baseUrl": "http://localhost:3000",
  "integrationFolder": "cypress/integration",
  "supportFile": "cypress/support/index.js",
  "videosFolder": "cypress/videos",
  "screenshotsFolder": "cypress/screenshots",
  "pluginsFile": "cypress/plugins/index.js",
  "fixturesFolder": "cypress/fixtures",
  "defaultCommandTimeout": 5000
}
EOF

echo "Created/Updated Cypress configuration."

# Update main ESLint configuration to ignore Cypress files
if [ -f ".eslintrc.json" ]; then
    # Check if ignorePatterns already exists
    if grep -q '"ignorePatterns"' .eslintrc.json; then
        # Add Cypress pattern to existing ignorePatterns
        sed -i '' 's/"ignorePatterns": \[/"ignorePatterns": \[\n    "cypress\/\*\*\/\*.js",/' .eslintrc.json
    else
        # Add new ignorePatterns section
        sed -i '' '/{/a\
  "ignorePatterns": ["cypress/**/*.js"],
' .eslintrc.json
    fi
    echo "Updated main ESLint configuration."
else
    # Create new .eslintrc.json if it doesn't exist
    echo '{
  "ignorePatterns": ["cypress/**/*.js"]
}' > .eslintrc.json
    echo "Created new main ESLint configuration."
fi

echo "Setup complete. Please restart your ESLint server or IDE for changes to take effect."