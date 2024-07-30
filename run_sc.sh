#!/bin/bash

# Create new directories
mkdir -p src/components/cards/CardEditor
mkdir -p src/services/storage

# Create new files for CardEditor
touch src/components/cards/CardEditor/CardEditor.tsx
touch src/components/cards/CardEditor/CardEditorStyles.ts
touch src/components/cards/CardEditor/CardEditorToolbar.tsx
touch src/components/cards/CardEditor/CardEditorStage.tsx
touch src/components/cards/CardEditor/CardEditorUtils.ts

# Create new files for storage
touch src/services/storage/index.ts
touch src/services/storage/cardStorage.ts
touch src/services/storage/deckStorage.ts

# Move original files to backup
mv src/components/cards/CardEditor.tsx src/components/cards/CardEditor.tsx.bak
mv src/services/storage.ts src/services/storage.ts.bak

echo "Files created successfully. Please manually move the code to the appropriate new files."