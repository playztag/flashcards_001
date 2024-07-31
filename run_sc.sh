#!/bin/bash

# Create the main CardEditor directory
mkdir -p src/components/cards/CardEditor/shapes src/components/cards/CardEditor/utils src/components/cards/CardEditor/styles

# Create files in the main CardEditor directory
touch src/components/cards/CardEditor/index.ts
touch src/components/cards/CardEditor/CardEditor.tsx
touch src/components/cards/CardEditor/CardEditorStage.tsx
touch src/components/cards/CardEditor/CardEditorToolbar.tsx
touch src/components/cards/CardEditor/TransformerHandler.tsx

# Create files in the shapes directory
touch src/components/cards/CardEditor/shapes/index.ts
touch src/components/cards/CardEditor/shapes/ShapeTypes.ts
touch src/components/cards/CardEditor/shapes/RectangleShape.tsx
touch src/components/cards/CardEditor/shapes/CircleShape.tsx
touch src/components/cards/CardEditor/shapes/EllipseShape.tsx
touch src/components/cards/CardEditor/shapes/TextShape.tsx
touch src/components/cards/CardEditor/shapes/LineShape.tsx
touch src/components/cards/CardEditor/shapes/TriangleShape.tsx
touch src/components/cards/CardEditor/shapes/renderShape.ts

# Create files in the utils directory
touch src/components/cards/CardEditor/utils/index.ts
touch src/components/cards/CardEditor/utils/mouseEventHandlers.ts
touch src/components/cards/CardEditor/utils/shapeUtils.ts

# Create files in the styles directory
touch src/components/cards/CardEditor/styles/index.ts
touch src/components/cards/CardEditor/styles/CardEditorStyles.ts

echo "CardEditor directory structure and files have been created."