"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingSteps = [
  "npm install portfolio...",
  "⠋ Fetching packages...",
  "⠙ Resolving dependencies...",
  "⠹ Building production bundle...",
  "⠸ Optimizing assets...",
  "⠼ Compiling SASS...",
  "⠴ Minifying JavaScript...",
  "⠦ Loading themes...",
  "⠧ Initializing terminal...",
  "✓ Done in 2.34s",
  "",
  "Welcome to my portfolio!",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const delay = currentStep === loadingSteps.length - 1 ? 500 : 150 + Math.random() * 100;
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 500);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[var(--background)] flex items-center justify-center"
        >
          <div className="w-full max-w-lg px-8">
            <div className="font-mono text-sm text-[var(--foreground)]">
              {loadingSteps.slice(0, currentStep + 1).map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${
                    step.startsWith("✓")
                      ? "text-[var(--green)]"
                      : step.startsWith("Welcome")
                      ? "text-[var(--purple)] font-bold mt-4 text-lg"
                      : step.startsWith("npm")
                      ? "text-[var(--cyan)]"
                      : "text-[var(--comment)]"
                  }`}
                >
                  {step}
                </motion.div>
              ))}
              {currentStep < loadingSteps.length - 1 && (
                <span className="cursor-blink text-[var(--foreground)]">▊</span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
