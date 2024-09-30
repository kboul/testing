import { items } from "../../app/fundamentals/constants";

describe("FundamentalsPage", () => {
  beforeEach(() => cy.visit("/fundamentals"));

  it("contais the header with the correct text", () => {
    cy.getDataTestId("fundamentals-header").contains(/fundamentals/i);
  });

  it("should have 8 accordion items", () => {
    cy.get(".MuiAccordion-root").should("have.length", 8);
  });

  describe("1st item", () => {
    it("should have the correct summary", () => {
     cy.getDataTestId("accordion-item-1").should((div) => {
        expect(div.text()).to.contain(items[0].summary);
      });
    });

    it("should have the correct details once tab is collapsed", () => {
      const button = cy.get(
        "[data-testid='accordion-item-1'] div[role='button']"
      );
      cy.contains(items[0].details).should("not.exist");
      button.click();
      cy.getDataTestId("accordion-item-1").should(
        "contain.text",
        items[0].details
      );
      button.click();
      cy.contains(items[0].details).should("not.exist");
    });
  });
});
