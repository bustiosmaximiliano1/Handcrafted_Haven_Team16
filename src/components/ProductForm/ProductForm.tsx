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
}

interface ProductFormProps {
  initialData?: ProductData;
  categories: OptionItem[];
  artisans?: OptionItem[]; // Ahora es opcional
  defaultArtisanId?: string; // Para forzar el ID cuando edita un artesano
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
  // Determinamos el ID del artesano asignado o por defecto
  const activeArtisanId = initialData?.artisanId || defaultArtisanId || "";

  return (
    <div className={styles.card}>
      {initialData?.id && (
        <p className={styles.subtitle}>
          ID: <code>{initialData.id}</code>
        </p>
      )}

      <form action={action} className={styles.form}>
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

        {/* Muestra el selector SOLO SI se proporciona la lista de artesanos (Vista Admin) */}
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
          /* Vista Artesano: Se envía de forma transparente el ID del artesano */
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

        <button type="submit" className={styles.submitBtn}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}