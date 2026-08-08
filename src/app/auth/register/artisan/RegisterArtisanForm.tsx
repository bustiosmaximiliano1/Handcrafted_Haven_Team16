"use client";

import { useMemo, useState } from "react";
import { registerAction } from "@/actions/auth-actions";
import { normalizeProfileImageUrl } from "@/lib/profile-image-url";
import styles from "@/app/auth/auth-form.module.css";

const profileImageValidationMessage =
  "Invalid image URL. Use a valid image extension (.jpg, .jpeg, .png, .webp, .gif, .svg) or a supported image platform URL.";

const allowedHosts = [
  "unsplash.com",
  "images.unsplash.com",
  "plus.unsplash.com",
  "pexels.com",
  "images.pexels.com",
  "pixabay.com",
  "cdn.pixabay.com",
  "imgur.com",
  "i.imgur.com",
  "cloudinary.com",
  "res.cloudinary.com",
  "githubusercontent.com",
  "images.weserv.nl",
];

export default function RegisterArtisanForm() {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileImageUrlError, setProfileImageUrlError] = useState<string | null>(null);

  const profileImageHintId = useMemo(() => "profileImageUrlHint", []);
  const profileImageErrorId = useMemo(() => "profileImageUrlError", []);

  const validateProfileImageUrl = (value: string) => {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      setProfileImageUrlError(null);
      return true;
    }

    const isValid = Boolean(normalizeProfileImageUrl(normalizedValue));
    setProfileImageUrlError(isValid ? null : profileImageValidationMessage);

    return isValid;
  };

  return (
    <form action={registerAction} className={styles.authForm}>
      <input type="hidden" name="role" value="ARTISAN" />

      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input type="text" id="name" name="name" required className={styles.input} />
      </div>

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

      <div className={styles.field}>
        <label className={styles.label} htmlFor="profileImageUrl">
          Profile Photo URL (optional)
        </label>
        <input
          type="url"
          id="profileImageUrl"
          name="profileImageUrl"
          placeholder="https://images.unsplash.com/..."
          className={styles.input}
          value={profileImageUrl}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setProfileImageUrl(nextValue);

            if (profileImageUrlError) {
              validateProfileImageUrl(nextValue);
            }
          }}
          onBlur={(event) => {
            validateProfileImageUrl(event.currentTarget.value);
          }}
          aria-invalid={profileImageUrlError ? true : undefined}
          aria-describedby={profileImageUrlError ? `${profileImageHintId} ${profileImageErrorId}` : profileImageHintId}
        />

        <p id={profileImageHintId} className={styles.fieldHint}>
          Enter a public image URL (http/https). Accepted if the URL ends with .jpg, .jpeg, .png, .webp, .gif, or .svg,
          or if it is from a supported image host.
        </p>

        <p className={styles.listTitle}>Supported hosts:</p>
        <ul className={styles.inlineList}>
          {allowedHosts.map((host) => (
            <li key={host}>{host}</li>
          ))}
        </ul>

        <p className={styles.fieldHint}>Tip: Open the image in a new tab and copy that direct URL.</p>

        {profileImageUrlError && (
          <p id={profileImageErrorId} className={styles.fieldError} role="alert" aria-live="polite">
            {profileImageUrlError}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`button button--dark ${styles.submit}`}
        disabled={Boolean(profileImageUrlError)}
      >
        Create Seller Account
      </button>
    </form>
  );
}
