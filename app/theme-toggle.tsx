"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = { mobile?: boolean };

export default function ThemeToggle({ mobile = false }: ThemeToggleProps) {
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem("osobola-theme");
      if (savedTheme === "light") {
        setLightMode(true);
        document.documentElement.dataset.theme = "light";
      }
    } catch {
      // Keep the default dark theme when storage is unavailable.
    }

    const syncTheme = (event: Event) => {
      setLightMode((event as CustomEvent<boolean>).detail);
    };

    window.addEventListener("osobola-theme-change", syncTheme);
    return () => window.removeEventListener("osobola-theme-change", syncTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = !lightMode;
    setLightMode(nextTheme);
    document.documentElement.dataset.theme = nextTheme ? "light" : "dark";

    try {
      window.localStorage.setItem("osobola-theme", nextTheme ? "light" : "dark");
    } catch {
      // The selected theme still applies for this visit.
    }

    window.dispatchEvent(new CustomEvent("osobola-theme-change", { detail: nextTheme }));
  }

  return (
    <button
      className={`theme-toggle${mobile ? " mobile-theme-toggle" : ""}`}
      type="button"
      aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={lightMode}
      onClick={toggleTheme}
    >
      {lightMode ? <Moon size={mobile ? 16 : 15} /> : <Sun size={mobile ? 16 : 15} />}
      <span>{lightMode ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
