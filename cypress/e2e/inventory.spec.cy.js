describe("Inventário", () => {
  beforeEach(function () {
    cy.fixture("users").then((users) => {
      cy.loginWithSession(users.standard.username, users.standard.password);
    });
  });

  it("lista 6 produtos", () => {
    cy.get('[data-test="inventory-item"]').should("have.length", 6);
  });

  it("ordena por preço, do menor para o maior", () => {
    cy.get('[data-test="product-sort-container"]').select("lohi");

    cy.get('[data-test="inventory-item-price"]').then(($prices) => {
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace("$", "")));
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it("adiciona e remove item do carrinho", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");

    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
  });
});