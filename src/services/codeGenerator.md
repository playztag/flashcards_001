# CodeGenerator Service

## Purpose
The CodeGenerator service is responsible for translating flash card and deck data into ESP32-compatible C++ code. This enables users to implement their flash card designs on physical ESP32 devices.

## Dependencies
- ../../types/Card
- ../../types/Deck
- ../../types/Shape

## Main Functionality
1. Generate C++ code for individual cards
2. Generate C++ code for entire decks
3. Optimize generated code for ESP32 performance
4. Handle different shape types (rectangles, circles, text)
5. Manage card transitions and interactions

## Service Structure
```typescript
class CodeGenerator {
  private generateShapeCode(shape: Shape): string;
  private generateCardCode(card: Card): string;
  private generateSetupCode(): string;
  private generateLoopCode(deck: Deck): string;

  public generateDeckCode(deck: Deck): string;
}
```

## Key Functions
- generateDeckCode(deck: Deck): string
  - Main function to generate the complete C++ code for a deck
- generateShapeCode(shape: Shape): string
  - Generates code for individual shapes (rectangle, circle, text)
- generateCardCode(card: Card): string
  - Generates code for rendering a single card (both sides)
- generateSetupCode(): string
  - Generates the setup() function for ESP32 initialization
- generateLoopCode(deck: Deck): string
  - Generates the loop() function for card display and interaction

## Code Generation Strategy
1. Generate necessary include statements and global variables
2. Create setup() function for ESP32 and display initialization
3. Generate functions for drawing each shape type
4. Create functions for rendering each card (both sides)
5. Implement a loop() function that handles card transitions and user input

## Error Handling
- Implement input validation to ensure all required card data is present
- Provide meaningful error messages for invalid or unsupported card designs

## Optimization Techniques
- Use efficient drawing commands specific to the ESP32 platform
- Minimize redundant code by creating reusable functions for common shapes
- Optimize memory usage by storing card data in program memory (PROGMEM)

## TODO
- [ ] Implement basic code structure generation
- [ ] Create functions for generating shape-specific code
- [ ] Implement card rendering code generation
- [ ] Add deck navigation and interaction code
- [ ] Implement error handling and input validation
- [ ] Optimize generated code for ESP32 performance
- [ ] Write unit tests for code generation functions
- [ ] Create integration tests with sample card and deck data