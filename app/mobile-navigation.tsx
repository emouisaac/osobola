"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const sections = [
  ["Home", "#home"],
  ["Courses", "#pricing"],
  ["How it works", "#how-it-works"],
  ["Projects", "#projects"],
  ["FAQ", "#faq"],
  ["Start learning", "#pricing"],
] as const;

export default function MobileNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav-wrap");
    if (!nav) return;

    const updateHeader = () => nav.classList.toggle("scrolled", window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <ul className="nav-links" aria-label="Page sections">
        {sections.slice(0, 5).map(([label, href]) => (
          <li key={label}><a href={href}>{label}</a></li>
        ))}
        <li><ThemeToggle /></li>
      </ul>
      <div className="nav-actions">
        <a className="text-link" href="mailto:hello@osobola.example">Contact</a>
        <a className="button button-primary button-small" href="#pricing">Start learning</a>
      </div>
      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <Menu className="menu-open-icon" size={19} />
          <X className="menu-close-icon" size={19} />
        </button>
        <ul id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
          {sections.map(([label, href]) => (
            <li key={label}><a href={href} onClick={() => setMenuOpen(false)}>{label}</a></li>
          ))}
          <li><a href="mailto:hello@osobola.example" onClick={() => setMenuOpen(false)}>Contact</a></li>
          <li><ThemeToggle mobile /></li>
        </ul>
      </div>

    </>
  );
}
