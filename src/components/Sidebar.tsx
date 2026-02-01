"use client";

import { useFiles, FileItem, fileTree } from "@/context/FileContext";
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileTreeItemProps {
  item: FileItem;
  depth: number;
}

function FileTreeItem({ item, depth }: FileTreeItemProps) {
  const { openFile, currentFile, expandedFolders, toggleFolder } = useFiles();
  const isExpanded = expandedFolders.includes(item.path);
  const isActive = currentFile === item.path;

  const handleClick = () => {
    if (item.type === "folder") {
      toggleFolder(item.path);
    } else {
      openFile({ name: item.name, path: item.path });
    }
  };

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

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-1 px-2 py-1 text-left text-sm hover:bg-[var(--current-line)] transition-colors rounded ${
          isActive ? "bg-[var(--current-line)] text-[var(--foreground)]" : "text-[var(--comment)]"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        aria-expanded={item.type === "folder" ? isExpanded : undefined}
      >
        {item.type === "folder" ? (
          <>
            {isExpanded ? (
              <ChevronDown size={14} className="text-[var(--comment)]" />
            ) : (
              <ChevronRight size={14} className="text-[var(--comment)]" />
            )}
            {isExpanded ? (
              <FolderOpen size={14} className="text-[var(--yellow)]" />
            ) : (
              <Folder size={14} className="text-[var(--yellow)]" />
            )}
          </>
        ) : (
          <>
            <span className="w-[14px]" />
            <span className="text-xs">{getFileIcon(item.name)}</span>
          </>
        )}
        <span className="truncate">{item.name}</span>
      </button>

      <AnimatePresence>
        {item.type === "folder" && isExpanded && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {item.children.map((child) => (
              <FileTreeItem key={child.path} item={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useFiles();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-[var(--current-line)] rounded hover:bg-[var(--comment)] transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} className="text-[var(--foreground)]" />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Mobile overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
              onClick={() => setSidebarOpen(false)}
            />

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed lg:relative z-40 w-[280px] h-full bg-[var(--background-secondary)] border-r border-[var(--current-line)] flex flex-col overflow-hidden"
            >
              {/* Explorer header */}
              <div className="px-4 py-3 text-xs uppercase tracking-wider text-[var(--comment)] border-b border-[var(--current-line)] flex items-center justify-between">
                <span>Explorer</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-[var(--comment)] hover:text-[var(--foreground)]"
                  aria-label="Close sidebar"
                >
                  ×
                </button>
              </div>

              {/* File tree */}
              <nav className="flex-1 overflow-y-auto py-2" aria-label="File explorer">
                {fileTree.map((item) => (
                  <FileTreeItem key={item.path} item={item} depth={0} />
                ))}
              </nav>

              {/* Footer */}
              <div className="px-4 py-2 text-xs text-[var(--comment)] border-t border-[var(--current-line)]">
                <span className="syntax-comment">{"// Click a file to view"}</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
