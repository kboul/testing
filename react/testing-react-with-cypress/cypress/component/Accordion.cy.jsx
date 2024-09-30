import ItemsAccordion from "../../app/components/Accordion";
import { items } from "../../app/fundamentals/constants";

describe("Accordion.cy.jsx", () => {
  it("renders the correct items length", () => {
    cy.mount(<ItemsAccordion items={items} />);

    cy.getDataTestId("accordion-wrapper").within(() => {
      cy.get('[data-testid^="accordion-item"]').should(
        "have.length",
        items.length
      );
    });

    cy.contains(items[0].details).should("not.exist");
    cy.getDataTestId("accordion-item-1").click();
    cy.getDataTestId("accordion-item-1").should(
      "contain.text",
      items[0].details
    );
    cy.getDataTestId("accordion-item-1").within(() => {
      cy.get('[role="button"]').click();
    });
    cy.contains(items[0].details).should("not.exist");
  });
});
