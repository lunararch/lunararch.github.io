"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useFiles } from "@/context/FileContext";
import { portfolioData } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, ChevronUp, ChevronDown, X, Minus } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Tim's Portfolio Terminal v1.0.0" },
    { type: "output", content: 'Type "help" to see available commands.\n' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { openFile } = useFiles();

  const commands: Record<string, () => string | void> = {
    help: () => `
Available commands:
  help        - Show all available commands
  about       - Navigate to about page
  skills      - Navigate to skills page
  projects    - Navigate to projects page
  contact     - Navigate to contact page
  resume      - Download resume
  clear       - Clear terminal
  history     - Show command history
  joke        - Random programming joke
  whoami      - Display info about you
  date        - Show current date/time
  tree        - Show file structure
  ls          - List files in current directory
  pwd         - Show current location
  neofetch    - Display system info
  matrix      - Try the matrix effect (not implemented yet)
  secret      - 🤫`,
    about: () => {
      openFile({ name: "README.md", path: "/readme" });
      return "> Navigating to README.md...";
    },
    skills: () => {
      openFile({ name: "skills.ts", path: "/skills" });
      return "> Navigating to skills.ts...";
    },
    projects: () => {
      openFile({ name: "projects.js", path: "/projects" });
      return "> Navigating to projects.js...";
    },
    contact: () => {
      openFile({ name: "contact.json", path: "/contact" });
      return "> Navigating to contact.json...";
    },
    resume: () => {
      window.open(portfolioData.resume.pdf_url, "_blank");
      return "> Opening resume...";
    },
    clear: () => {
      setLines([]);
      return undefined;
    },
    history: () => {
      if (history.length === 0) return "No commands in history.";
      return history.map((cmd, i) => `  ${i + 1}  ${cmd}`).join("\n");
    },
    joke: () => {
      const jokes = portfolioData.terminal_jokes;
      return jokes[Math.floor(Math.random() * jokes.length)];
    },
    whoami: () => `${portfolioData.personal_info.title} | ${portfolioData.personal_info.tagline}`,
    date: () => new Date().toLocaleString(),
    pwd: () => "/home/visitor/portfolio",
    ls: () => `README.md  src/  assets/  contact.json  .env`,
    tree: () => `
📁 my-portfolio/
├── 📄 README.md
├── 📁 src/
│   ├── 📄 projects.js
│   ├── 📄 skills.ts
│   └── 📄 experience.py
├── 📁 assets/
│   └── 📄 resume.pdf
├── 📄 contact.json
└── 📄 .env`,
    neofetch: () => `
       ████████████           visitor@portfolio
    ████            ████      -----------------
  ████    ████████    ████    OS: Portfolio OS 1.0
 ████   ██        ██   ████   Host: ${portfolioData.personal_info.name}
████   ██          ██   ████  Kernel: React 18
████   ██          ██   ████  Shell: zsh 5.8
████   ██          ██   ████  Theme: Dracula Pro
 ████   ██        ██   ████   Terminal: this one
  ████    ████████    ████    CPU: Brain @ ${Math.random().toFixed(1)}GHz
    ████            ████      Memory: Too Many Tabs / ∞ TB
       ████████████           Coffee: ${portfolioData.easter_egg_stats.coffee_consumed}`,
    matrix: () => "🔮 Matrix mode coming soon... Or is it? Try the Konami code!",
    secret: () => `
🔒 Access Level: VISITOR
━━━━━━━━━━━━━━━━━━━━━━━━
Bugs created: ${portfolioData.easter_egg_stats.bugs_created}
Bugs fixed: ${portfolioData.easter_egg_stats.bugs_fixed}
Coffee consumed: ${portfolioData.easter_egg_stats.coffee_consumed}
Stack Overflow visits: ${portfolioData.easter_egg_stats.stack_overflow_visits}
All-nighters pulled: ${portfolioData.easter_egg_stats.all_nighters_pulled}
━━━━━━━━━━━━━━━━━━━━━━━━`,
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setLines((prev) => [...prev, { type: "input", content: `visitor@portfolio:~$ ${cmd}` }]);

    if (trimmedCmd) {
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);

      if (commands[trimmedCmd]) {
        const output = commands[trimmedCmd]();
        if (output) {
          setLines((prev) => [...prev, { type: "output", content: output }]);
        }
      } else {
        setLines((prev) => [
          ...prev,
          { type: "error", content: `Command not found: ${cmd}. Type 'help' for available commands.` },
        ]);
      }
    }
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(commands).find((cmd) => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <>
      {/* Terminal toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-16 right-4 z-50 p-3 rounded-full shadow-lg transition-all ${
          isOpen ? "bg-[var(--red)]" : "bg-[var(--purple)]"
        } text-[var(--background)] hover:scale-110`}
        aria-label={isOpen ? "Close terminal" : "Open terminal"}
      >
        {isOpen ? <X size={20} /> : <TerminalIcon size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isMinimized ? 40 : 300, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-12 left-0 right-0 z-40 bg-[var(--background-secondary)] border-t border-[var(--current-line)] overflow-hidden"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--current-line)] border-b border-[var(--background)]">
              <div className="flex items-center gap-2 text-sm">
                <TerminalIcon size={14} />
                <span>Terminal</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-[var(--comment)] rounded transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-[var(--comment)] rounded transition-colors"
                  aria-label="Minimize"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[var(--red)] rounded transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal content */}
            {!isMinimized && (
              <div
                ref={terminalRef}
                className="h-[calc(100%-40px)] overflow-y-auto p-4 font-mono text-sm"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      line.type === "input"
                        ? "text-[var(--green)]"
                        : line.type === "error"
                        ? "text-[var(--red)]"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    {line.content}
                  </div>
                ))}

                {/* Input line */}
                <div className="flex items-center text-[var(--green)]">
                  <span>visitor@portfolio:~$&nbsp;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-[var(--foreground)]"
                    aria-label="Terminal input"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <span className="cursor-blink text-[var(--foreground)]">▊</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
