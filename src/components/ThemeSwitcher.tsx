"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Palette, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { themes } from "@/lib/themes";

export function ThemeSwitcher() {
  const { themeName, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--current-line)] hover:bg-[var(--comment)] text-[var(--foreground)] rounded transition-colors"
        aria-label="Change theme"
        aria-expanded={isOpen}
      >
        <Palette size={16} />
        <span className="hidden sm:inline">Theme</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 z-50 min-w-[180px] bg-[var(--background-secondary)] border border-[var(--current-line)] rounded shadow-lg overflow-hidden"
            >
              <div className="px-3 py-2 text-xs text-[var(--comment)] border-b border-[var(--current-line)]">
                Select Theme
              </div>
              {availableThemes.map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setTheme(name);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-[var(--current-line)] transition-colors ${
                    themeName === name ? "text-[var(--green)]" : "text-[var(--foreground)]"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded border border-[var(--comment)]"
                    style={{ backgroundColor: themes[name].colors.purple }}
                  />
                  <span className="flex-1">{themes[name].label}</span>
                  {themeName === name && <Check size={14} />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
