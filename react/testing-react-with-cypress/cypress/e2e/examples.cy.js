describe("multiple examples", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });

  it("should navigate accross the correct pages", () => {
    cy.visit("/");

    cy.getDataTestId("nav-why-cypress").click();
    cy.location("pathname").should("equal", "/");

    cy.getDataTestId("nav-overview").click();
    cy.location("pathname").should("equal", "/overview");
  });

  it("intercepts", () => {
    cy.intercept("POST", "http://localhost:3001/examples", {
      // included in fixtures folder
      fixture: "grudge.json"
    });
  });

  it("grudges are added/removed properly", () => {
    cy.contains(/add some grudges/i).should("exist");

    cy.getDataTestId("grudge-input").type("First grudge");
    cy.getDataTestId("grudge-ul").within(() => {
      cy.get("li").should("have.length", 0);
    });
    cy.getDataTestId("add-grudge-btn").click();

    cy.contains("First grudge").should("exist");
    cy.getDataTestId("grudge-header").should("exist");
    cy.contains("Clear").should("exist");

    cy.getDataTestId("grudge-ul").within(() => {
      cy.get("li").should("have.length", 1);
      cy.get("li")
        .its(0)
        .within(() => {
          cy.get("button").click();
        });
    });

    cy.contains("First grudge").should("not.exist");
    cy.contains("Clear").should("not.exist");
  });
});
