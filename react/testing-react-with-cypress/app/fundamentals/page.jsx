import ItemsAccordion from "../components/Accordion";
import { items } from "./constants";
import styles from "./fundamentals.module.css";

export default function FundamentalsPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.header} data-testid="fundamentals-header">
        Testing Fundamentals
      </h1>
      <ItemsAccordion items={items} />
    </main>
  );
}
