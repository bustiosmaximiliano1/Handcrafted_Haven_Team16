
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./ProductFilter.module.css";

interface ProductFilterCategory {
  id: string;
  name: string;
}

interface ProductFilterProps {
  categories: ProductFilterCategory[];
  activeCategoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: boolean;
  sort?: string;
}

export default function ProductFilter({
  categories,
  activeCategoryId,
  minPrice,
  maxPrice,
  inStock,
  sort,
}: ProductFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
 const [isMobileOpen, setIsMobileOpen] = useState(false);
const [validationError, setValidationError] = useState("");

  const activeCategoryName = useMemo(() => {
    const selected = categories.find((category) => category.id === activeCategoryId);
    return selected?.name ?? "All categories";
  }, [activeCategoryId, categories]);

  useEffect(() => {
    if (!isMobileOpen) return;

    // I lock body scroll while the mobile filter panel is open to avoid background scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  const updateCategory = (categoryId?: string) => {
    // I sync the selected category with URL params so the Server Component can re-run the Prisma query.
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId) {
      params.set("categoryId", categoryId);
    } else {
      params.delete("categoryId");
    }

    params.delete("category");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
    setIsMobileOpen(false);
  };

  const applyAdvancedFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // I sync advanced criteria in URL params so price and stock filters are server-driven.
    const formData = new FormData(event.currentTarget);
    const nextMinPrice = String(formData.get("minPrice") ?? "").trim();
    const nextMaxPrice = String(formData.get("maxPrice") ?? "").trim();

    // Clear any previous validation message
setValidationError("");

// Validate the price range
if (nextMinPrice && nextMaxPrice) {
  const min = Number(nextMinPrice);
  const max = Number(nextMaxPrice);

  if (min > max) {
    setValidationError(
      "Minimum price cannot be greater than maximum price."
    );
    return;
  }
}

    const nextSort = String(formData.get("sort") ?? "newest").trim();
    const nextInStockOnly = formData.get("inStock") === "1";
    const params = new URLSearchParams(searchParams.toString());

    if (nextMinPrice) {
      params.set("minPrice", nextMinPrice);
    } else {
      params.delete("minPrice");
    }

    if (nextMaxPrice) {
      params.set("maxPrice", nextMaxPrice);
    } else {
      params.delete("maxPrice");
    }

    if (nextInStockOnly) {
      params.set("inStock", "1");
    } else {
      params.delete("inStock");
    }

    if (nextSort && nextSort !== "newest") {
      params.set("sort", nextSort);
    } else {
      params.delete("sort");
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
    setIsMobileOpen(false);
  };

  const clearAdvancedFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("inStock");
    params.delete("sort");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
    setIsMobileOpen(false);
  };

  const renderCategoryOptions = () => (
    <ul className={styles.categoryList}>
      <li>
        <button
          type="button"
          onClick={() => updateCategory()}
          className={`${styles.categoryButton} ${!activeCategoryId ? styles.categoryButtonActive : ""}`}
          aria-pressed={!activeCategoryId}
        >
          All categories
        </button>
      </li>

      {categories.map((category) => {
        const isActive = category.id === activeCategoryId;

        return (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => updateCategory(category.id)}
              className={`${styles.categoryButton} ${isActive ? styles.categoryButtonActive : ""}`}
              aria-pressed={isActive}
            >
              {category.name}
            </button>
          </li>
        );
      })}
    </ul>
  );

  const renderAdvancedFilters = () => (
    <form className={styles.advancedFilters} onSubmit={applyAdvancedFilters} key={searchParams.toString()}>
      <h3 className={styles.groupTitle}>Price range</h3>

      <div className={styles.priceInputs}>
        <label className={styles.inputLabel}>
          Min
          <input
            name="minPrice"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            defaultValue={minPrice ?? ""}
            className={styles.input}
            placeholder="0"
          />
        </label>

        <label className={styles.inputLabel}>
          Max
          <input
            name="maxPrice"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            defaultValue={maxPrice ?? ""}
            className={styles.input}
            placeholder="200"
          />
        </label>
      </div>

      <h3 className={styles.groupTitle}>Other criteria</h3>
      <label className={styles.checkLabel}>
        <input name="inStock" type="checkbox" value="1" defaultChecked={Boolean(inStock)} />
        Only show in-stock items
      </label>

      <label className={styles.inputLabel}>
        Sort by
        <select name="sort" defaultValue={sort ?? "newest"} className={styles.select}>
          <option value="newest">Newest arrivals</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
          <option value="name_asc">Name: A to Z</option>
        </select>
      </label>

{validationError && (
  <p
    className={styles.validationError}
    role="alert"
    aria-live="polite"
  >
    {validationError}
  </p>
)}
      <div className={styles.actions}>
        <button type="submit" className="button button--primary">
          Apply
        </button>
        <button type="button" className="button button--secondary" onClick={clearAdvancedFilters}>
          Reset
        </button>
      </div>
    </form>
  );

  return (
    <>
      <aside className={styles.sidebar} aria-label="Product category filters">
        <h2 className={styles.sidebarTitle}>Filter by category</h2>
        {renderCategoryOptions()}
        {renderAdvancedFilters()}
      </aside>

      <button
        type="button"
        className={styles.mobileFloatingButton}
        onClick={() => setIsMobileOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isMobileOpen}
        aria-controls="product-mobile-filter"
      >
        Filters · {activeCategoryName}
      </button>

      {isMobileOpen && (
        <div className={styles.mobileOverlay} role="dialog" aria-modal="true" id="product-mobile-filter">
          <button
            type="button"
            className={styles.mobileBackdrop}
            aria-label="Close filters"
            onClick={() => setIsMobileOpen(false)}
          />

          <section className={styles.mobilePanel}>
            <div className={styles.mobilePanelHeader}>
              <h2 className={styles.mobilePanelTitle}>Choose category</h2>
              <button
                type="button"
                className={styles.mobileCloseButton}
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>
            {renderCategoryOptions()}
            {renderAdvancedFilters()}
          </section>
        </div>
      )}
    </>
  );
}
