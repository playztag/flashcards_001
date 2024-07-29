# StudyMode

## Purpose
The StudyMode component provides an interface for users to study their flash cards, tracking progress and allowing for card navigation.

## Dependencies
- react
- @material-ui/core
- ../cards/CardViewer
- ../../hooks/useStudySession
- ../../types/Deck

## Props
- deckId: string

## Main Functionality
1. Display cards from the selected deck one at a time
2. Allow navigation between cards (next, previous)
3. Track and display study progress
4. Provide options to mark cards as known or for review
5. Implement spaced repetition algorithm for card ordering

## Component Structure
```typescript
const StudyMode: React.FC<StudyModeProps> = ({ deckId }) => {
  // Study session state management
  // Card navigation logic
  // Progress tracking

  return (
    <div className="study-mode">
      {/* Current card display */}
      {/* Navigation controls */}
      {/* Progress indicator */}
      {/* Known/Review buttons */}
    </div>
  );
};
```

## TODO
- [ ] Implement study session initialization
- [ ] Create card navigation functionality
- [ ] Add progress tracking and display
- [ ] Implement known/review marking system
- [ ] Integrate basic spaced repetition algorithm
- [ ] Write unit tests