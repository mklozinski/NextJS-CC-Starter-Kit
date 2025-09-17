"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (mounted ? (resolvedTheme ?? theme) : "light") === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  // Render a stable, non-janky button before hydration completes
  if (!mounted) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={false}
        aria-label="Toggle dark mode"
        onClick={toggle}
        className={`relative inline-flex h-8 w-14 items-center rounded-full bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className ?? ""}`}
      >
        <span className="sr-only">Toggle dark mode</span>
        <span className="absolute left-1 text-amber-500/80" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
          </svg>
        </span>
        <span className="absolute right-1 text-slate-300" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="currentColor" />
          </svg>
        </span>
        <span className="inline-block h-6 w-6 translate-x-1 transform rounded-full bg-white shadow transition-transform" />
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggle}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isDark ? "bg-slate-800" : "bg-slate-200"} ${className ?? ""}`}
    >
      <span className="sr-only">Toggle dark mode</span>

      <span
        className={`absolute left-1 text-amber-400 transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`}
        aria-hidden="true"
      >
        {/* Sun */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M4.93 19.07l1.41-1.41" />
            <path d="M17.66 6.34l1.41-1.41" />
          </g>
        </svg>
      </span>

      <span
        className={`absolute right-1 text-slate-200 transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        {/* Moon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="currentColor" />
        </svg>
      </span>

      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${isDark ? "translate-x-7" : "translate-x-1"}`}
      />
    </button>
  );
}