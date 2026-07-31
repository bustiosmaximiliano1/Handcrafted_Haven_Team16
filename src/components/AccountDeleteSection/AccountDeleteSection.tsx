"use client";

import { useActionState, useRef } from "react";
import { deleteOwnAccountAction } from "@/actions/profile-actions";
import styles from "./AccountDeleteSection.module.css";

const initialState = { error: null as string | null };

export default function AccountDeleteSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, formAction, isPending] = useActionState(deleteOwnAccountAction, initialState);

  return (
    <section className={styles.dangerZone}>
      <h2 className={styles.heading}>Delete account</h2>
      <p className={styles.description}>
        This action is permanent. Your account access will be removed and you will be signed out immediately.
      </p>

      <button
        type="button"
        className={`button button--secondary ${styles.trigger}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        Delete account
      </button>

      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogContent}>
          <h3 className={styles.dialogTitle}>Confirm account deletion</h3>
          <p className={styles.dialogText}>
            Type DELETE to confirm. This cannot be undone.
          </p>

          <form action={formAction} className={styles.form}>
            <label htmlFor="confirmDelete" className={styles.label}>
              Confirmation word
            </label>
            <input
              id="confirmDelete"
              name="confirmDelete"
              type="text"
              placeholder="DELETE"
              autoComplete="off"
              required
              className={styles.input}
            />

            {state.error && <p className={styles.error}>{state.error}</p>}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancel}
                onClick={() => dialogRef.current?.close()}
                disabled={isPending}
              >
                Cancel
              </button>
              <button type="submit" className={styles.confirm} disabled={isPending}>
                {isPending ? "Deleting..." : "Delete permanently"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </section>
  );
}
