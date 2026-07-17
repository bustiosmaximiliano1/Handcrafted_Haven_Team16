import { CATEGORIES } from "@/lib/types";
import styles from "./FilterBar.module.css";

/**
 * Presentational placeholder for the catalog filters.
 *
 * It shows WHERE the filters live and what they look like, but it does not
 * filter anything yet. Making it work is its own user story:
 *   "As a user, I want to filter products by category and price range."
 *
 * To wire it up, add "use client" at the top, lift state up (or use URL
 * search params), and filter the product list in the catalog page.
 */
export default function FilterBar() {
  return (
    <aside className={styles.bar} aria-label="Product filters (not yet functional)">
      <div className={styles.group}>
        <label className={styles.label} htmlFor="category">
          Category
        </label>
        <select id="category" className={styles.select} defaultValue="all" disabled>
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label} htmlFor="min">
          Price range
        </label>
        <div className={styles.range}>
          <input id="min" className={styles.input} placeholder="Min" disabled />
          <span aria-hidden="true">–</span>
          <input id="max" className={styles.input} placeholder="Max" disabled />
        </div>
      </div>

      <p className={styles.note}>Filters are a work item — not wired up yet.</p>
    </aside>
  );
}
