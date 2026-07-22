import styles from "./ProductForm.module.css";

interface Category {
  id: string;
  name: string;
}

interface ProductData {
  id?: string;
  name?: string;
  price?: { toString: () => string } | number;
  stock?: number;
  description?: string | null;
  categoryId?: string | null;
}

interface ProductFormProps {
  initialData?: ProductData;
  categories: Category[];
  action: (formData: FormData) => Promise<void>;
  buttonText?: string;
}

export default function ProductForm({
  initialData,
  categories,
  action,
  buttonText = "Save Changes",
}: ProductFormProps) {
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