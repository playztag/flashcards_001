# Flash Card Creator SVG Layout Specification

## Purpose
This document outlines the SVG layout for the Flash Card Creator application, detailing each section and its components.

## Layout Overview

### Header
- **Purpose**: Displays the application title and navigation menu.
- **Components**:
  - `rect`: Background rectangle for the header.
  - `text`: Application title.
  - `rect` and `text`: Navigation menu.

### Sidebar
- **Purpose**: Displays current deck information and a list of cards.
- **Components**:
  - `rect`: Background rectangle for the sidebar.
  - `text`: Current deck title and card count.
  - `rect`: Background for the card list.
  - `text`: Card titles.

### Main Content Area
- **Purpose**: Card editor with toolbars and canvases for editing sides A and B of the cards.
- **Components**:
  - `rect`: Background rectangle for the main content area.
  - `rect`: Toolbar background.
  - Tool icons (rect, circle, polygon, text).
  - Undo/redo icons (paths).
  - Canvases for side A and side B (rectangles).
  - Example shapes and text on canvases (rect, circle, text).
  - Save button (rect and text).

### Footer
- **Purpose**: Displays application information and links.
- **Components**:
  - `rect`: Background rectangle for the footer.
  - `text`: Footer content.

### SVG Code
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
  <!-- Background -->
  <rect width="1200" height="900" fill="#f0f0f0"/>
  
  <!-- Header -->
  <rect width="1200" height="60" fill="#4a90e2"/>
  <text x="20" y="38" font-family="Arial, sans-serif" font-size="24" fill="white">Flash Card Creator</text>
  <rect x="1000" y="15" width="180" height="30" fill="#3a7bd5"/>
  <text x="1015" y="36" font-family="Arial, sans-serif" font-size="16" fill="white">Navigation Menu</text>
  
  <!-- Left Sidebar - Current Deck Info -->
  <rect x="0" y="60" width="250" height="840" fill="#e0e0e0"/>
  <text x="20" y="90" font-family="Arial, sans-serif" font-size="18" fill="#333">Current Deck: Physics</text>
  <text x="20" y="120" font-family="Arial, sans-serif" font-size="16" fill="#666">Cards: 15</text>
  
  <!-- Card List -->
  <rect x="10" y="140" width="230" height="660" fill="#f5f5f5"/>
  <text x="20" y="165" font-family="Arial, sans-serif" font-size="16" fill="#333">Card 1: Newton's First Law</text>
  <text x="20" y="195" font-family="Arial, sans-serif" font-size="16" fill="#333">Card 2: F = ma</text>
  <text x="20" y="225" font-family="Arial, sans-serif" font-size="16" fill="#333">Card 3: Energy Conservation</text>
  
  <!-- New Card Button -->
  <rect x="10" y="810" width="230" height="40" fill="#4caf50"/>
  <text x="70" y="835" font-family="Arial, sans-serif" font-size="16" fill="white">Create New Card</text>
  
  <!-- Main Content Area - Card Editor -->
  <rect x="250" y="60" width="950" height="800" fill="white"/>
  
  <!-- Toolbar -->
  <rect x="250" y="60" width="950" height="50" fill="#f5f5f5"/>
  <!-- Shape Tools -->
  <rect x="270" y="70" width="30" height="30" fill="#ddd" stroke="#999"/>
  <rect x="310" y="70" width="30" height="30" fill="#ddd" stroke="#999" rx="15"/>
  <polygon points="360,70 375,100 345,100" fill="#ddd" stroke="#999"/>
  <!-- Text Tool -->
  <rect x="400" y="70" width="30" height="30" fill="#ddd" stroke="#999"/>
  <text x="408" y="92" font-family="Arial, sans-serif" font-size="18" fill="#333">T</text>
  <!-- Color Picker -->
  <rect x="450" y="70" width="30" height="30" fill="url(#colorGradient)"/>
  <!-- Undo/Redo -->
  <path d="M500,85 h15 v-10 l10,10 l-10,10 v-10 h-15 z" fill="#666"/>
  <path d="M570,85 h-15 v-10 l-10,10 l10,10 v-10 h15 z" fill="#666"/>
  
  <!-- Side A Canvas -->
  <rect x="270" y="130" width="450" height="640" fill="white" stroke="#ccc" stroke-width="2"/>
  <text x="460" y="160" font-family="Arial, sans-serif" font-size="20" fill="#333">Side A</text>
  
  <!-- Side B Canvas -->
  <rect x="730" y="130" width="450" height="640" fill="white" stroke="#ccc" stroke-width="2"/>
  <text x="920" y="160" font-family="Arial, sans-serif" font-size="20" fill="#333">Side B</text>
  
  <!-- Example Shapes on Canvas -->
  <rect x="300" y="200" width="150" height="100" fill="#ff9800" stroke="#333" stroke-width="2"/>
  <circle cx="900" cy="300" r="60" fill="#e91e63" stroke="#333" stroke-width="2"/>
  <text x="350" y="400" font-family="Arial, sans-serif" font-size="18" fill="#333">Question</text>
  <text x="800" y="400" font-family="Arial, sans-serif" font-size="18" fill="#333">Answer</text>
  
  <!-- Save Button -->
  <rect x="1080" y="790" width="100" height="40" fill="#4caf50" rx="5"/>
  <text x="1110" y="815" font-family="Arial, sans-serif" font-size="16" fill="white">Save</text>
  
  <!-- Footer -->
  <rect x="0" y="860" width="1200" height="40" fill="#333"/>
  <text x="20" y="885" font-family="Arial, sans-serif" font-size="14" fill="white">App Information</text>
  <text x="1100" y="885" font-family="Arial, sans-serif" font-size="14" fill="white">Links</text>
  
  <!-- Definitions -->
  <defs>
    <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
      <stop offset="33%" style="stop-color:rgb(0,255,0);stop-opacity:1" />
      <stop offset="67%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
    </linearGradient>
  </defs>
</svg>
