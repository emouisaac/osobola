"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
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
  const [preview, setPreview] = useState<{ id: string; title: string } | null>(null);
  const previewTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!preview) return;
    const section = document.getElementById(preview.id);
    if (!section) return;

    section.classList.add("section-preview-active");
    function navigateFromSection(event: Event) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute("href");
      const destination = href ? document.getElementById(href.slice(1)) : null;
      if (!link || !destination) return;

      event.preventDefault();
      setPreview({ id: destination.id, title: link.textContent?.trim() || "Section" });
    }

    section.addEventListener("click", navigateFromSection);
    return () => {
      section.removeEventListener("click", navigateFromSection);
      section.classList.remove("section-preview-active");
    };
  }, [preview]);

  function openSection(event: MouseEvent<HTMLAnchorElement>, title: string, href: string) {
    event.preventDefault();
    const showSection = () => setPreview({ id: href.slice(1), title });

    if (menuOpen && window.matchMedia("(max-width: 700px)").matches) {
      setMenuOpen(false);
      if (previewTimerRef.current !== null) window.clearTimeout(previewTimerRef.current);
      previewTimerRef.current = window.setTimeout(showSection, 360);
      return;
    }

    showSection();
  }

  return (
    <>
      <ul className="nav-links" aria-label="Page sections">
        {sections.slice(0, 5).map(([label, href]) => (
          <li key={label}><a href={href} onClick={(event) => openSection(event, label, href)}>{label}</a></li>
        ))}
        <li><ThemeToggle /></li>
      </ul>
      <div className="nav-actions">
        <a className="text-link" href="mailto:hello@osobola.example">Contact</a>
        <a className="button button-primary button-small" href="#pricing" onClick={(event) => openSection(event, "Start learning", "#pricing")}>Start learning</a>
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
            <li key={label}><a href={href} onClick={(event) => openSection(event, label, href)}>{label}</a></li>
          ))}
          <li><a href="mailto:hello@osobola.example" onClick={() => setMenuOpen(false)}>Contact</a></li>
          <li><ThemeToggle mobile /></li>
        </ul>
      </div>

    </>
  );
}
