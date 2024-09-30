describe("forms", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });

  it("should test subscribe form", () => {
    cy.contains(/testing forms/i).should("exist");

    cy.getDataTestId("subscribe-form").find("input").as("subscribe-input");

    cy.get("@subscribe-input").type("kostas@gmail.com");

    cy.contains(/successfully subbed: kostas@gmail.com/i).should("not.exist");

    cy.getDataTestId("subscribe-button").click();

    cy.contains(/successfully subbed: kostas@gmail.com/i).should("exist");

    cy.wait(3000);

    // test invalid scenario

    cy.contains(/successfully subbed/i).should("not.exist");

    cy.get("@subscribe-input").type("kostas@gmail.io");
    cy.contains(/invalid email: /i).should("not.exist");

    cy.getDataTestId("subscribe-button").click();

    cy.contains(/invalid email: kostas@gmail.io/i).should("exist");

    cy.wait(3000);

    cy.contains(/invalid email: kostas@gmail.io/i).should("not.exist");

    // fail scenario

    cy.getDataTestId("subscribe-button").click();

    cy.contains(/fail/i).should("exist");
  });
});
