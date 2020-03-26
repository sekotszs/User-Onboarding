describe("Testing our volunteer form", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3002/");
    });
    it("Add test to inputs and submit form", function() {
        cy.get('input[name="name"]')
        .type("Zoe")
        .should("have.value", "Zoe");
        cy.get("input[name='email']")
      .type("email@email.com")
      .should("have.value", "email@email.com");
      cy.get('input[name="password"]')
      .type("Legoshi")
      .should("have.value", "Legoshi");
      cy.get('[type="checkbox"]')
      .check();
      cy.get("button").click();
});
});