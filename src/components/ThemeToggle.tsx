import React, { useState, useEffect, useCallback } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

interface AdaptiveThemeToggleProps {
  isCollapsed: boolean;
}

export function ThemeToggle({ isCollapsed }: AdaptiveThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  }, [theme]);

  if (isCollapsed) {
    return (
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center ml-auto mr-auto h-10 w-10 rounded-full bg-zinc-700 hover:bg-zinc-600"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-between bg-zinc-900 p-1 rounded-full w-fit">
        {["light", "dark"].map((mode) => (
          <button
            key={mode}
            onClick={toggleTheme}
            className={`flex items-center justify-center space-x-2 h-8 w-full rounded-full transition-all p-3 duration-300 ease-in-out ${
              theme === mode ? "bg-zinc-600 text-white" : "opacity-50"
            }`}
          >
            {mode === "light" ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
            <span className="text-sm">
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ThemeToggle);
