"use client";

import { useFiles } from "@/context/FileContext";
import { ReadmePage } from "./pages/ReadmePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SkillsPage } from "./pages/SkillsPage";
import { ContactPage } from "./pages/ContactPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { EnvPage } from "./pages/EnvPage";
import { ResumePage } from "./pages/ResumePage";
import { motion, AnimatePresence } from "framer-motion";

const pageComponents: Record<string, React.ComponentType> = {
  "/readme": ReadmePage,
  "/projects": ProjectsPage,
  "/skills": SkillsPage,
  "/contact": ContactPage,
  "/experience": ExperiencePage,
  "/env": EnvPage,
  "/resume": ResumePage,
};

export function EditorContent() {
  const { currentFile, openFiles } = useFiles();

  if (openFiles.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-[var(--comment)]">
        <div className="text-center">
          <div className="text-4xl mb-4">📂</div>
          <p>No file open</p>
          <p className="text-sm mt-2">Select a file from the explorer</p>
          <p className="text-sm mt-1">or press <kbd className="px-2 py-1 bg-[var(--current-line)] rounded">Ctrl+K</kbd> to search</p>
        </div>
      </div>
    );
  }

  const PageComponent = pageComponents[currentFile];

  return (
    <div className="flex-1 overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFile}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
        >
          {PageComponent ? (
            <PageComponent />
          ) : (
            <div className="flex items-center justify-center h-full text-[var(--comment)] p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🚧</div>
                <p>Page not found: {currentFile}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
