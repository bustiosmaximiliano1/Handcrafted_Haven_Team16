"use client";

import { useActionState } from "react";
import { loginAction, type LoginActionState } from "@/actions/auth-actions";
import styles from "@/app/auth/auth-form.module.css";

const initialState: LoginActionState = {
  error: null,
};

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className={styles.authForm}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input type="email" id="email" name="email" required className={styles.input} />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input type="password" id="password" name="password" required className={styles.input} />
      </div>

      {state.error && (
        <p className={styles.formError} role="alert" aria-live="polite">
          {state.error}
        </p>
      )}

      <button type="submit" className={`button button--primary button--subtle-lift ${styles.submit}`}>
        Sign In
      </button>
    </form>
  );
}
