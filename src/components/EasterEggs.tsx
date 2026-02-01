"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);

  useEffect(() => {
    // Console messages for curious developers
    console.log(
      "%c🕵️ Hey there! Inspecting the code, huh?",
      "font-size: 16px; color: #50fa7b;"
    );
    console.log(
      "%c💡 Tip: Try typing 'help' in the terminal",
      "font-size: 14px; color: #8be9fd;"
    );
    console.log(
      "%c☕ This portfolio was built with 47 cups of coffee",
      "font-size: 14px; color: #ffb86c;"
    );
    console.log(
      "%c🎮 Psst... try the Konami code (↑↑↓↓←→←→BA)",
      "font-size: 14px; color: #ff79c6;"
    );
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);
        
        if (newIndex === KONAMI_CODE.length) {
          setShowSecret(true);
          setKonamiIndex(0);
          setTimeout(() => setShowSecret(false), 10000);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  return (
    <>
      {/* Secret Stats Modal */}
      <AnimatePresence>
        {showSecret && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-[60]"
              onClick={() => setShowSecret(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] 
                         bg-[var(--background)] border-2 border-[var(--green)] rounded-lg p-8
                         shadow-[0_0_50px_var(--green)] max-w-md w-full"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--green)] mb-2">
                  🎮 SECRET UNLOCKED!
                </h2>
                <p className="text-[var(--comment)]">
                  You found the Konami code easter egg!
                </p>
              </div>

              <div className="font-mono text-sm space-y-2 bg-[var(--background-secondary)] p-4 rounded">
                <div className="text-[var(--pink)]">{"{"}</div>
                <div className="pl-4">
                  <span className="text-[var(--purple)]">"secret_stats"</span>
                  <span className="text-[var(--foreground)]">: {"{"}</span>
                </div>
                <div className="pl-8">
                  <span className="text-[var(--cyan)]">"bugs_created"</span>
                  <span className="text-[var(--foreground)]">: </span>
                  <span className="text-[var(--orange)]">{portfolioData.easter_egg_stats.bugs_created}</span>
                  <span className="text-[var(--foreground)]">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-[var(--cyan)]">"bugs_fixed"</span>
                  <span className="text-[var(--foreground)]">: </span>
                  <span className="text-[var(--orange)]">{portfolioData.easter_egg_stats.bugs_fixed}</span>
                  <span className="text-[var(--foreground)]">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-[var(--cyan)]">"coffee_consumed"</span>
                  <span className="text-[var(--foreground)]">: </span>
                  <span className="text-[var(--yellow)]">"{portfolioData.easter_egg_stats.coffee_consumed}"</span>
                  <span className="text-[var(--foreground)]">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-[var(--cyan)]">"stack_overflow_visits"</span>
                  <span className="text-[var(--foreground)]">: </span>
                  <span className="text-[var(--yellow)]">"{portfolioData.easter_egg_stats.stack_overflow_visits}"</span>
                  <span className="text-[var(--foreground)]">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-[var(--cyan)]">"projects_started"</span>
                  <span className="text-[var(--foreground)]">: </span>
                  <span className="text-[var(--orange)]">{portfolioData.easter_egg_stats.projects_started}</span>
                  <span className="text-[var(--foreground)]">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-[var(--cyan)]">"projects_finished"</span>
                  <span className="text-[var(--foreground)]">: </span>
                  <span className="text-[var(--orange)]">{portfolioData.easter_egg_stats.projects_finished}</span>
                  <span className="text-[var(--foreground)]">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-[var(--cyan)]">"keyboards_destroyed"</span>
                  <span className="text-[var(--foreground)]">: </span>
                  <span className="text-[var(--orange)]">{portfolioData.easter_egg_stats.keyboard_destroyed}</span>
                  <span className="text-[var(--foreground)]">,</span>
                </div>
                <div className="pl-8">
                  <span className="text-[var(--cyan)]">"all_nighters_pulled"</span>
                  <span className="text-[var(--foreground)]">: </span>
                  <span className="text-[var(--orange)]">{portfolioData.easter_egg_stats.all_nighters_pulled}</span>
                </div>
                <div className="pl-4">
                  <span className="text-[var(--foreground)]">{"}"}</span>
                </div>
                <div className="text-[var(--pink)]">{"}"}</div>
              </div>

              <button
                onClick={() => setShowSecret(false)}
                className="mt-6 w-full py-2 bg-[var(--green)] text-[var(--background)] rounded font-bold hover:opacity-90 transition-opacity"
              >
                Nice! Close this
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Matrix Effect (placeholder) */}
      <AnimatePresence>
        {matrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] pointer-events-none"
          >
            {/* Matrix rain would go here */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
