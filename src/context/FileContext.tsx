"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface FileItem {
  name: string;
  path: string;
  type: "file" | "folder";
  icon?: string;
  children?: FileItem[];
}

export const fileTree: FileItem[] = [
  {
    name: "my-portfolio",
    path: "/",
    type: "folder",
    children: [
      { name: "README.md", path: "/readme", type: "file", icon: "📄" },
      {
        name: "src",
        path: "/src",
        type: "folder",
        children: [
          { name: "projects.js", path: "/projects", type: "file", icon: "📄" },
          { name: "skills.ts", path: "/skills", type: "file", icon: "📄" },
          { name: "experience.py", path: "/experience", type: "file", icon: "📄" },
        ],
      },
      {
        name: "assets",
        path: "/assets",
        type: "folder",
        children: [
          { name: "resume.pdf", path: "/resume", type: "file", icon: "📄" },
        ],
      },
      { name: "contact.json", path: "/contact", type: "file", icon: "📄" },
      { name: ".env", path: "/env", type: "file", icon: "📄" },
    ],
  },
];

interface OpenFile {
  name: string;
  path: string;
}

interface FileContextType {
  openFiles: OpenFile[];
  currentFile: string;
  openFile: (file: OpenFile) => void;
  closeFile: (path: string) => void;
  setCurrentFile: (path: string) => void;
  expandedFolders: string[];
  toggleFolder: (path: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([
    { name: "README.md", path: "/readme" },
  ]);
  const [currentFile, setCurrentFile] = useState("/readme");
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["/", "/src", "/assets"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const openFile = (file: OpenFile) => {
    if (!openFiles.find((f) => f.path === file.path)) {
      setOpenFiles([...openFiles, file]);
    }
    setCurrentFile(file.path);
  };

  const closeFile = (path: string) => {
    const newFiles = openFiles.filter((f) => f.path !== path);
    setOpenFiles(newFiles);
    if (currentFile === path && newFiles.length > 0) {
      setCurrentFile(newFiles[newFiles.length - 1].path);
    }
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  return (
    <FileContext.Provider
      value={{
        openFiles,
        currentFile,
        openFile,
        closeFile,
        setCurrentFile,
        expandedFolders,
        toggleFolder,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFiles must be used within a FileProvider");
  }
  return context;
}
