"use client";

import { useState } from "react";
import { normalizeProductImageUrl } from "@/lib/product-image-url";
import styles from "./ProductForm.module.css";

interface OptionItem {
  id: string;
  name: string | null;
}

interface ProductData {
  id?: string;
  name?: string;
  price?: { toString: () => string } | number;
  stock?: number;
  description?: string | null;
  categoryId?: string | null;
  artisanId?: string | null;
  images?: { url: string }[] | null;
}

interface ProductFormProps {
  initialData?: ProductData;
  categories: OptionItem[];
  artisans?: OptionItem[];
  defaultArtisanId?: string;
  action: (formData: FormData) => Promise<void>;
  buttonText?: string;
}

export default function ProductForm({
  initialData,
  categories,
  artisans,
  defaultArtisanId,
  action,
  buttonText = "Save Changes",
}: ProductFormProps) {
  const activeArtisanId = initialData?.artisanId || defaultArtisanId || "";
  const initialImageUrl = initialData?.images?.[0]?.url || "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [imageUrlError, setImageUrlError] = useState<string | null>(null);

  const validateImageUrl = (value: string) => {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      setImageUrlError(null);
      return true;
    }

    const isValid = Boolean(normalizeProductImageUrl(normalizedValue));
    setImageUrlError(
      isValid
        ? null
        : "Invalid image URL. Use a valid image extension (.jpg, .jpeg, .png, .webp, .gif, .svg) or a supported image platform URL."
    );

    return isValid;
  };

  return (
    <div className={styles.card}>
      {initialData?.id && (
        <p className={styles.subtitle}>
          ID: <code>{initialData.id}</code>
        </p>
      )}

      <form action={action} className={styles.form}>
        {initialData?.id && <input type="hidden" name="productId" value={initialData.id} />}

        <div className={styles.group}>
          <label className={styles.label}>Product Name</label>
          <input
            type="text"
            name="name"
            defaultValue={initialData?.name || ""}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Category</label>
          <select
            name="categoryId"
            defaultValue={initialData?.categoryId || ""}
            className={styles.select}
          >
            <option value="">Uncategorized</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {artisans ? (
          <div className={styles.group}>
            <label className={styles.label}>Artisan / Maker</label>
            <select
              name="artisanId"
              defaultValue={activeArtisanId}
              className={styles.select}
            >
              <option value="">No Artisan Assigned</option>
              {artisans.map((artisan) => (
                <option key={artisan.id} value={artisan.id}>
                  {artisan.name || "Unnamed Artisan"}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <input type="hidden" name="artisanId" value={activeArtisanId} />
        )}

        <div className={styles.group}>
          <label className={styles.label}>Price ($)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={initialData?.price ? initialData.price.toString() : ""}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Stock</label>
          <input
            type="number"
            name="stock"
            defaultValue={initialData?.stock ?? 0}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={initialData?.description || ""}
            className={styles.textarea}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Product Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={imageUrl}
            placeholder="https://plus.unsplash.com/premium_photo-1714943792698-04676952002e?auto=format&fit=crop&w=800&q=80"
            className={styles.input}
            onChange={(event) => {
              const nextValue = event.currentTarget.value;
              setImageUrl(nextValue);

              if (imageUrlError) {
                validateImageUrl(nextValue);
              }
            }}
            onBlur={(event) => {
              validateImageUrl(event.currentTarget.value);
            }}
            aria-invalid={imageUrlError ? true : undefined}
            aria-describedby={imageUrlError ? "productImageUrlError" : undefined}
          />
          <p className={styles.helperText}>
            Example:{" "}
            https://plus.unsplash.com/premium_photo-1714943792698-04676952002e?auto=format&fit=crop&w=800&q=80
          </p>
          <p className={styles.helperText}>
            Enter a public image URL (http/https). URLs are accepted if they end with .jpg, .jpeg, .png, .webp,
            .gif, or .svg.
          </p>
          <p className={styles.helperText}>
            You can also use URLs from supported hosts such as:
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className={styles.helperLink}>
              Unsplash
            </a>,
            <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className={styles.helperLink}>
              Pexels
            </a>,
            and
            <a href="https://pixabay.com" target="_blank" rel="noreferrer" className={styles.helperLink}>
              Pixabay
            </a>.
          </p>

          {imageUrlError && (
            <p id="productImageUrlError" className={styles.fieldError} role="alert" aria-live="polite">
              {imageUrlError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`${styles.submitBtn} button button--dark`}
          disabled={Boolean(imageUrlError)}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}