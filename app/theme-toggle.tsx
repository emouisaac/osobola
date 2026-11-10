"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = { mobile?: boolean };

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("osobola-theme-change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("osobola-theme-change", onStoreChange);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem("osobola-theme") === "light";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle({ mobile = false }: ThemeToggleProps) {
  const lightMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.theme = lightMode ? "light" : "dark";
  }, [lightMode]);

  function toggleTheme() {
    const nextTheme = !lightMode;
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
