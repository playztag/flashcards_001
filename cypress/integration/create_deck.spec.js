describe('Create Deck', () => {
  it('successfully creates a new deck', () => {
    cy.visit('/deck-management');
    cy.get('input[placeholder="Enter deck name"]').type('New Test Deck');
    cy.get('input[placeholder="Enter deck description"]').type('This is a test deck');
    cy.contains('Create New Deck').click();
    cy.contains('New Test Deck').should('be.visible');
    cy.contains('This is a test deck').should('be.visible');
  });
});
