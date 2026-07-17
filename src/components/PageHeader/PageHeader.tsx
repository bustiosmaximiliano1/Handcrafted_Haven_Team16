import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

/** Consistent heading band for every inner page. */
export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  );
}
