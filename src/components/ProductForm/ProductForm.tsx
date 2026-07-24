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
            defaultValue={initialData?.images?.[0]?.url || ""}
            placeholder="https://plus.unsplash.com/premium_photo-1714943792698-04676952002e?auto=format&fit=crop&w=800&q=80"
            className={styles.input}
          />
          <p className={styles.helperText}>
            Example:{" "}
            https://plus.unsplash.com/premium_photo-1714943792698-04676952002e?auto=format&fit=crop&w=800&q=80
          </p>
          <p className={styles.helperText}>
            Hey seller, from Team 16 we want to share with you some great places where you can find lovely images for your product.
          </p>
          <p className={styles.helperText}>
            You can explore:
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
        </div>

        <button type="submit" className={`${styles.submitBtn} button button--primary`}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}