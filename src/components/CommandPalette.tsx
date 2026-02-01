"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useFiles } from "@/context/FileContext";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { portfolioData } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Folder, Palette, Code, ExternalLink } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: "navigation" | "theme" | "project" | "action";
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openFile } = useFiles();
  const { setTheme } = useTheme();

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-readme",
        label: "README.md",
        description: "About / Landing page",
        icon: <FileText size={16} />,
        action: () => openFile({ name: "README.md", path: "/readme" }),
        category: "navigation",
      },
      {
        id: "nav-projects",
        label: "projects.js",
        description: "View all projects",
        icon: <Code size={16} />,
        action: () => openFile({ name: "projects.js", path: "/projects" }),
        category: "navigation",
      },
      {
        id: "nav-skills",
        label: "skills.ts",
        description: "Technical skills",
        icon: <Code size={16} />,
        action: () => openFile({ name: "skills.ts", path: "/skills" }),
        category: "navigation",
      },
      {
        id: "nav-contact",
        label: "contact.json",
        description: "Contact information",
        icon: <FileText size={16} />,
        action: () => openFile({ name: "contact.json", path: "/contact" }),
        category: "navigation",
      },
      // Themes
      ...Object.keys(themes).map((themeName) => ({
        id: `theme-${themeName}`,
        label: `Theme: ${themes[themeName].label}`,
        description: "Change color theme",
        icon: <Palette size={16} />,
        action: () => setTheme(themeName),
        category: "theme" as const,
      })),
      // Projects
      ...portfolioData.projects.map((project) => ({
        id: `project-${project.name}`,
        label: project.name,
        description: project.description,
        icon: <Folder size={16} />,
        action: () => {
          if (project.github_url) {
            window.open(project.github_url, "_blank");
          }
        },
        category: "project" as const,
      })),
      // Actions
      {
        id: "action-github",
        label: "Open GitHub",
        description: "View GitHub profile",
        icon: <ExternalLink size={16} />,
        action: () => window.open(portfolioData.social_links.github.url, "_blank"),
        category: "action",
      },
      {
        id: "action-linkedin",
        label: "Open LinkedIn",
        description: "View LinkedIn profile",
        icon: <ExternalLink size={16} />,
        action: () => window.open(portfolioData.social_links.linkedin.url, "_blank"),
        category: "action",
      },
      {
        id: "action-resume",
        label: "Download Resume",
        description: "View/download resume",
        icon: <FileText size={16} />,
        action: () => window.open(portfolioData.resume.pdf_url, "_blank"),
        category: "action",
      },
    ],
    [openFile, setTheme]
  );

  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    const lower = search.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(lower) ||
        cmd.description?.toLowerCase().includes(lower)
    );
  }, [commands, search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      filteredCommands[selectedIndex].action();
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl"
          >
            <div className="bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--current-line)]">
                <Search size={18} className="text-[var(--comment)]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search files, commands, projects..."
                  className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder-[var(--comment)]"
                />
                <kbd className="px-2 py-1 text-xs bg-[var(--current-line)] text-[var(--comment)] rounded">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-[var(--comment)]">
                    No results found
                  </div>
                ) : (
                  filteredCommands.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        i === selectedIndex
                          ? "bg-[var(--current-line)]"
                          : "hover:bg-[var(--current-line)]"
                      }`}
                    >
                      <span className="text-[var(--purple)]">{cmd.icon}</span>
                      <div className="flex-1">
                        <div className="text-[var(--foreground)]">{cmd.label}</div>
                        {cmd.description && (
                          <div className="text-xs text-[var(--comment)]">{cmd.description}</div>
                        )}
                      </div>
                      <span className="text-xs text-[var(--comment)] capitalize">
                        {cmd.category}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--current-line)] text-xs text-[var(--comment)]">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[var(--current-line)] rounded">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[var(--current-line)] rounded">↵</kbd>
                  select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[var(--current-line)] rounded">esc</kbd>
                  close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
