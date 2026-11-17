describe("Checkout", () => {
  beforeEach(function () {
    cy.fixture("users").then((users) => {
      cy.loginWithSession(users.standard.username, users.standard.password);
    });
  });

  it("finaliza uma compra completa", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="inventory-item"]').should("have.length", 2);
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type("Ana");
    cy.get('[data-test="lastName"]').type("Teste");
    cy.get('[data-test="postalCode"]').type("25600-000");
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="complete-header"]').should("have.text", "Thank you for your order!");
  });

  it("valida campos obrigatórios do checkout", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain", "First Name is required");
  });
});