import styles from "./StubNotice.module.css";

interface StubNoticeProps {
  /** The user story this page implements. */
  story: string;
  /** The board tasks still to do here. */
  todo: string[];
}

/**
 * A visible marker for a page that is scaffolded but not built yet.
 * It states which user story owns the page and the tasks left to do, so
 * whoever picks up the card knows exactly what to build and where.
 * Delete this component from a page once the real UI replaces it.
 */
export default function StubNotice({ story, todo }: StubNoticeProps) {
  return (
    <section className="container" style={{ paddingBlock: "2.5rem" }}>
      <div className={styles.card}>
        <p className={styles.tag}>To build</p>
        <p className={styles.story}>{story}</p>
        <ul className={styles.list}>
          {todo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
