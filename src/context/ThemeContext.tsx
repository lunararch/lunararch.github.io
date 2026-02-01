"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Theme, themes } from "@/lib/themes";

interface ThemeContextType {
  theme: Theme;
  themeName: string;
  setTheme: (name: string) => void;
  availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState("dracula");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme");
    if (saved && themes[saved]) {
      setThemeName(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-theme", themeName);
      const theme = themes[themeName];
      const root = document.documentElement;
      
      root.style.setProperty("--background", theme.colors.background);
      root.style.setProperty("--background-secondary", theme.colors.backgroundSecondary);
      root.style.setProperty("--current-line", theme.colors.currentLine);
      root.style.setProperty("--foreground", theme.colors.foreground);
      root.style.setProperty("--comment", theme.colors.comment);
      root.style.setProperty("--cyan", theme.colors.cyan);
      root.style.setProperty("--green", theme.colors.green);
      root.style.setProperty("--orange", theme.colors.orange);
      root.style.setProperty("--pink", theme.colors.pink);
      root.style.setProperty("--purple", theme.colors.purple);
      root.style.setProperty("--red", theme.colors.red);
      root.style.setProperty("--yellow", theme.colors.yellow);
    }
  }, [themeName, mounted]);

  const setTheme = (name: string) => {
    if (themes[name]) {
      setThemeName(name);
    }
  };

  const value = {
    theme: themes[themeName],
    themeName,
    setTheme,
    availableThemes: Object.keys(themes),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
