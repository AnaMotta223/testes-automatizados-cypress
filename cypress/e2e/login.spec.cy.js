describe("Login", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
  });

  it("faz login com usuário válido", function () {
    cy.login(this.users.standard.username, this.users.standard.password);
    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="title"]').should("have.text", "Products");
  });

  it("mostra erro com senha inválida", function () {
    cy.login(this.users.standard.username, "senha_errada");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Username and password do not match");
  });

  it("bloqueia o usuário locked_out_user", function () {
    cy.login(this.users.lockedOut.username, this.users.lockedOut.password);
    cy.get('[data-test="error"]').should("contain", "locked out");
  });

  it("exige usuário e senha", () => {
    cy.visit("/");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should("contain", "Username is required");
  });
});