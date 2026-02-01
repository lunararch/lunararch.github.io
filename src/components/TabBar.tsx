"use client";

import { useFiles } from "@/context/FileContext";
import { X } from "lucide-react";

export function TabBar() {
  const { openFiles, currentFile, setCurrentFile, closeFile } = useFiles();

  const getFileIcon = (name: string) => {
    if (name.endsWith(".md")) return "📝";
    if (name.endsWith(".js")) return "🟨";
    if (name.endsWith(".ts")) return "🔷";
    if (name.endsWith(".py")) return "🐍";
    if (name.endsWith(".json")) return "📋";
    if (name.endsWith(".pdf")) return "📕";
    if (name === ".env") return "🔒";
    return "📄";
  };

  if (openFiles.length === 0) return null;

  return (
    <div className="flex bg-[var(--background-secondary)] border-b border-[var(--current-line)] overflow-x-auto">
      {openFiles.map((file) => (
        <div
          key={file.path}
          onClick={() => setCurrentFile(file.path)}
          role="tab"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setCurrentFile(file.path)}
          className={`group flex items-center gap-2 px-4 py-2 text-sm border-r border-[var(--current-line)] transition-colors min-w-fit cursor-pointer ${
            currentFile === file.path
              ? "bg-[var(--background)] text-[var(--foreground)]"
              : "bg-[var(--background-secondary)] text-[var(--comment)] hover:bg-[var(--current-line)]"
          }`}
        >
          <span className="text-xs">{getFileIcon(file.name)}</span>
          <span className="whitespace-nowrap">{file.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeFile(file.path);
            }}
            className="opacity-0 group-hover:opacity-100 hover:bg-[var(--current-line)] rounded p-0.5 transition-opacity"
            aria-label={`Close ${file.name}`}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
