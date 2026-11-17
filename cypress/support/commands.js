// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password, { log: false });
  cy.get('[data-test="login-button"]').click();
});

// Login com cache de sessão (mais rápido nos testes que não testam o login em si)
Cypress.Commands.add("loginWithSession", (username, password) => {
  cy.session([username, password], () => {
    cy.login(username, password);
    cy.url().should("include", "/inventory.html");
  });

  // cy.session deixa a página em branco, então precisa visitar de novo.
  // failOnStatusCode: false porque o servidor responde 404 em acesso direto.
  cy.visit("/inventory.html", { failOnStatusCode: false });
});