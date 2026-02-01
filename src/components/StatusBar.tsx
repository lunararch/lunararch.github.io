"use client";

import { useFiles } from "@/context/FileContext";
import { useTheme } from "@/context/ThemeContext";
import { GitBranch, Check, Bell, Layout } from "lucide-react";

export function StatusBar() {
  const { currentFile } = useFiles();
  const { theme } = useTheme();

  const getFileType = (path: string) => {
    if (path.includes("readme")) return "Markdown";
    if (path.includes("projects")) return "JavaScript";
    if (path.includes("skills")) return "TypeScript";
    if (path.includes("experience")) return "Python";
    if (path.includes("contact")) return "JSON";
    if (path.includes("env")) return "Environment";
    if (path.includes("resume")) return "PDF";
    return "Plain Text";
  };

  return (
    <footer className="flex items-center justify-between px-3 py-1 bg-[var(--purple)] text-[var(--background)] text-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <GitBranch size={14} />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1">
          <Check size={14} />
          <span>0 Problems</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span>Ln 1, Col 1</span>
        <span>UTF-8</span>
        <span>{getFileType(currentFile)}</span>
        <div className="flex items-center gap-1">
          <Layout size={14} />
          <span>{theme.label}</span>
        </div>
        <Bell size={14} />
      </div>
    </footer>
  );
}
