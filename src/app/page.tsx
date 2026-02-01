"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TabBar } from "@/components/TabBar";
import { StatusBar } from "@/components/StatusBar";
import { EditorContent } from "@/components/EditorContent";
import { Terminal } from "@/components/Terminal";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { CommandPalette } from "@/components/CommandPalette";
import { LoadingScreen } from "@/components/LoadingScreen";
import { EasterEggs } from "@/components/EasterEggs";
import { useFiles } from "@/context/FileContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { sidebarOpen } = useFiles();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <div className="h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {/* Top bar with theme switcher */}
        <header className="flex items-center justify-between px-4 py-2 bg-[var(--background-secondary)] border-b border-[var(--current-line)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--purple)] font-bold">⚡</span>
            <span className="hidden sm:inline text-sm text-[var(--foreground)]">Tim's Portfolio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--comment)] bg-[var(--current-line)] px-2 py-1 rounded">
              <kbd className="px-1 bg-[var(--background)] rounded">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1 bg-[var(--background)] rounded">K</kbd>
              <span className="ml-1">Command Palette</span>
            </div>
            <ThemeSwitcher />
          </div>
        </header>

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Editor area */}
          <main className={`flex-1 flex flex-col overflow-hidden transition-all ${sidebarOpen ? "lg:ml-0" : ""}`}>
            {/* Tab bar */}
            <TabBar />

            {/* Editor content */}
            <EditorContent />
          </main>
        </div>

        {/* Status bar */}
        <StatusBar />

        {/* Terminal */}
        <Terminal />

        {/* Command palette */}
        <CommandPalette />

        {/* Easter eggs */}
        <EasterEggs />
      </div>
    </>
  );
}
