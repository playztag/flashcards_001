# Flash Card Creator

## Project Overview

Flash Card Creator is an innovative web application designed to empower educators and students in creating interactive, ESP32-compatible flash cards. This tool bridges the gap between digital design and physical implementation, allowing users to create visually rich flash cards and generate code for use with ESP32 devices.

## Key Features

- Intuitive card editor with drag-and-drop interface
- Support for text, shapes, and basic images
- Two-sided card creation (Side A and Side B)
- Deck management for organizing cards
- ESP32 code generation for interactive physical implementations
- Basic study mode with progress tracking
- Import/Export functionality for sharing decks
- Responsive design for desktop and tablet use

## Technology Stack

- Frontend: React with TypeScript
- State Management: Redux Toolkit, React Query
- UI Components: Material-UI (MUI)
- Canvas Manipulation: Konva.js with react-konva
- Form Handling: React Hook Form
- Routing: React Router
- Styling: Emotion (CSS-in-JS)
- Local Storage: localforage
- Testing: Jest, React Testing Library, Cypress
- Build Tool: Webpack (via Create React App)
- Deployment: Netlify/Vercel

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/flash-card-creator.git
   cd flash-card-creator
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or if using Yarn:
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or:
   ```
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
flash-card-creator/
├── public/            # Public assets
├── src/               # Source files
│   ├── components/    # Reusable React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── context/       # React context files
│   ├── services/      # API and service files
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   ├── styles/        # Global styles and themes
│   └── constants/     # Application constants
├── tests/             # Test files
├── scripts/           # Utility scripts
└── config/            # Configuration files
```

## Development Workflow

1. Create a new branch for each feature or bug fix.
2. Write tests for new functionality.
3. Ensure all tests pass before submitting a pull request.
4. Follow the established code style and conventions.
5. Update documentation as necessary.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [List any libraries, tools, or resources that significantly contributed to the project]