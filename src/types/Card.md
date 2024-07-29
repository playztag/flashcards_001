# Card

## Purpose
Defines the structure of a flash card, including all elements on both sides.

## Properties
- id: string
- deckId: string
- sideA: CardSide
- sideB: CardSide

## CardSide
- elements: Element[]

## Element
- id: string
- type: 'text' | 'rectangle' | 'circle'
- content: string (for text)
- style: ElementStyle
- position: Position

## ElementStyle
- fontFamily?: string
- fontSize?: number
- fontColor?: string
- backgroundColor?: string
- borderColor?: string
- borderWidth?: number

## Position
- x: number
- y: number
- width: number
- height: number

## TODO
- [ ] Implement the Card type
- [ ] Create functions for manipulating Card objects
- [ ] Add validation for Card properties
- [ ] Implement JSON serialization and deserialization methods