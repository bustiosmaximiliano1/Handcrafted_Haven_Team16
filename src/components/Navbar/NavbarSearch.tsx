"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Navbar.module.css";

export default function NavbarSearch() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState(searchParams.get("q") ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!window.matchMedia("(max-width: 520px)").matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = term.trim();

    if (!q) {
      router.push("/products");
      setIsOpen(false);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("q", q);
    router.push(`/products?${params.toString()}`);
    setIsOpen(false);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.searchWrap}>
      {isOpen && (
        <button
          type="button"
          className={styles.searchBackdrop}
          aria-label="Close search"
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        type="button"
        className={styles.searchToggle}
        aria-label={isOpen ? "Close product search" : "Open product search"}
        aria-expanded={isOpen}
        aria-controls="navbar-search-form"
        onClick={() => {
          if (!isOpen) {
            setTerm(searchParams.get("q") ?? "");
          }
          setIsOpen((prev) => !prev);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.searchIcon}>
          <path
            d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm9.7 13.3-3.3-3.3-1.4 1.4 3.3 3.3a1 1 0 1 0 1.4-1.4Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <form
          id="navbar-search-form"
          className={styles.searchForm}
          onSubmit={handleSubmit}
          role="search"
          aria-label="Site search"
        >
          <input
            ref={inputRef}
            type="search"
            name="q"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search products"
            className={styles.searchInput}
          />
        </form>
      )}
    </div>
  );
}
