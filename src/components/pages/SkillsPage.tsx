"use client";

import { useState, useMemo } from "react";
import { portfolioData, SkillLevel, SkillCategory } from "@/data/portfolio";
import { motion } from "framer-motion";

function getLevelColor(level: SkillLevel): string {
  switch (level) {
    case "expert":
      return "var(--green)";
    case "proficient":
      return "var(--cyan)";
    case "comfortable":
      return "var(--yellow)";
    case "learning":
      return "var(--comment)";
    default:
      return "var(--foreground)";
  }
}

function getLevelPercent(level: SkillLevel): number {
  switch (level) {
    case "expert":
      return 100;
    case "proficient":
      return 80;
    case "comfortable":
      return 60;
    case "learning":
      return 40;
    default:
      return 20;
  }
}

function SkillBar({ skill }: { skill: (typeof portfolioData.skills)[0] }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center gap-4 py-3 px-4 bg-[var(--background-secondary)] rounded-lg border border-[var(--current-line)] hover:border-[var(--purple)] transition-colors">
        {/* Skill name */}
        <div className="w-28 flex-shrink-0">
          <span className="text-[var(--foreground)] font-medium">{skill.name}</span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 h-3 bg-[var(--current-line)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getLevelPercent(skill.level)}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: getLevelColor(skill.level) }}
          />
        </div>

        {/* Level badge */}
        <div
          className="w-24 text-right text-sm"
          style={{ color: getLevelColor(skill.level) }}
        >
          {skill.level}
        </div>

        {/* Experience years as comment */}
        <div className="w-20 text-right text-[var(--comment)] text-sm">
          // {skill.experience_years}yr
        </div>
      </div>

      {/* Tooltip with fun fact */}
      {showTooltip && skill.fun_fact && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 -bottom-2 transform translate-y-full z-10"
        >
          <div className="bg-[var(--background)] border border-[var(--purple)] rounded-lg p-3 shadow-lg text-sm">
            <span className="text-[var(--comment)]">{"// "}</span>
            <span className="text-[var(--yellow)]">"{skill.fun_fact}"</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function SkillsPage() {
  const [filter, setFilter] = useState<SkillCategory | "all">("all");
  const [levelFilter, setLevelFilter] = useState<SkillLevel | "all">("all");
  const { skills } = portfolioData;

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const categoryMatch = filter === "all" || skill.category === filter;
      const levelMatch = levelFilter === "all" || skill.level === levelFilter;
      return categoryMatch && levelMatch;
    });
  }, [skills, filter, levelFilter]);

  const categories = ["frontend", "backend", "tools", "other"] as const;
  const levels = ["expert", "proficient", "comfortable", "learning"] as const;

  const groupedSkills = useMemo(() => {
    const groups: Record<string, typeof skills> = {};
    filteredSkills.forEach((skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    });
    return groups;
  }, [filteredSkills]);

  return (
    <div className="p-6">
      {/* TypeScript file header */}
      <div className="font-mono text-sm mb-6">
        <div className="text-[var(--comment)]">{"/**"}</div>
        <div className="text-[var(--comment)]"> * @file skills.ts</div>
        <div className="text-[var(--comment)]"> * @description My technical skills and experience</div>
        <div className="text-[var(--comment)]">{" */"}</div>
      </div>

      {/* Type definitions */}
      <div className="font-mono text-sm mb-6 space-y-2">
        <div>
          <span className="text-[var(--pink)]">type</span>{" "}
          <span className="text-[var(--cyan)]">SkillLevel</span>{" "}
          <span className="text-[var(--pink)]">=</span>{" "}
          {levels.map((l, i) => (
            <span key={l}>
              <span className="text-[var(--yellow)]">"{l}"</span>
              {i < levels.length - 1 && <span className="text-[var(--pink)]"> | </span>}
            </span>
          ))}
          <span className="text-[var(--foreground)]">;</span>
        </div>
        <div>
          <span className="text-[var(--pink)]">type</span>{" "}
          <span className="text-[var(--cyan)]">SkillCategory</span>{" "}
          <span className="text-[var(--pink)]">=</span>{" "}
          {categories.map((c, i) => (
            <span key={c}>
              <span className="text-[var(--yellow)]">"{c}"</span>
              {i < categories.length - 1 && <span className="text-[var(--pink)]"> | </span>}
            </span>
          ))}
          <span className="text-[var(--foreground)]">;</span>
        </div>
      </div>

      {/* Filter controls styled as function calls */}
      <div className="font-mono text-sm mb-8 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[var(--pink)]">const</span>{" "}
          <span className="text-[var(--foreground)]">filtered</span>{" "}
          <span className="text-[var(--pink)]">=</span>{" "}
          <span className="text-[var(--cyan)]">skills</span>
          <span className="text-[var(--foreground)]">.</span>
          <span className="text-[var(--green)]">filter</span>
          <span className="text-[var(--foreground)]">(</span>
          <span className="text-[var(--orange)]">s</span>{" "}
          <span className="text-[var(--pink)]">=&gt;</span>{" "}
          <span className="text-[var(--orange)]">s</span>
          <span className="text-[var(--foreground)]">.</span>
          <span className="text-[var(--purple)]">category</span>{" "}
          <span className="text-[var(--pink)]">===</span>{" "}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as SkillCategory | "all")}
            className="bg-[var(--current-line)] text-[var(--yellow)] px-2 py-1 rounded border border-[var(--comment)] outline-none focus:border-[var(--purple)]"
          >
            <option value="all">"*"</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                "{c}"
              </option>
            ))}
          </select>
          <span className="text-[var(--foreground)]">);</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[var(--comment)]">{"// "}</span>
          <span className="text-[var(--foreground)]">filtered</span>
          <span className="text-[var(--foreground)]">.</span>
          <span className="text-[var(--green)]">filter</span>
          <span className="text-[var(--foreground)]">(</span>
          <span className="text-[var(--orange)]">s</span>{" "}
          <span className="text-[var(--pink)]">=&gt;</span>{" "}
          <span className="text-[var(--orange)]">s</span>
          <span className="text-[var(--foreground)]">.</span>
          <span className="text-[var(--purple)]">level</span>{" "}
          <span className="text-[var(--pink)]">===</span>{" "}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as SkillLevel | "all")}
            className="bg-[var(--current-line)] text-[var(--yellow)] px-2 py-1 rounded border border-[var(--comment)] outline-none focus:border-[var(--purple)]"
          >
            <option value="all">"*"</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                "{l}"
              </option>
            ))}
          </select>
          <span className="text-[var(--foreground)]">);</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-8 p-4 bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg">
        <div className="text-[var(--comment)] text-sm mb-3">// Skill Level Legend</div>
        <div className="flex flex-wrap gap-4">
          {levels.map((level) => (
            <div key={level} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: getLevelColor(level) }}
              />
              <span className="text-sm capitalize" style={{ color: getLevelColor(level) }}>
                {level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills display */}
      <div className="font-mono text-sm">
        <div className="mb-4">
          <span className="text-[var(--pink)]">const</span>{" "}
          <span className="text-[var(--foreground)]">skills</span>
          <span className="text-[var(--pink)]">:</span>{" "}
          <span className="text-[var(--cyan)]">Skill</span>
          <span className="text-[var(--foreground)]">[]</span>{" "}
          <span className="text-[var(--pink)]">=</span>{" "}
          <span className="text-[var(--foreground)]">[</span>
        </div>

        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="mb-6">
            {/* Category comment */}
            <div className="text-[var(--comment)] mb-3 capitalize">
              {"// "}{category}
            </div>

            {/* Skills in category */}
            <div className="space-y-2 pl-4">
              {categorySkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SkillBar skill={skill} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <span className="text-[var(--foreground)]">];</span>
        </div>
      </div>

      {/* Helper functions display */}
      <div className="font-mono text-sm mt-8 text-[var(--comment)]">
        <div>// Helper functions (hover over skills to see fun facts!)</div>
        <div className="mt-2">
          <span className="text-[var(--pink)]">export</span>{" "}
          <span className="text-[var(--pink)]">default</span>{" "}
          <span className="text-[var(--foreground)]">skills;</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 p-4 bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg">
        <div className="text-[var(--comment)] text-sm mb-3">// Quick Stats</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--purple)]">{skills.length}</div>
            <div className="text-sm text-[var(--comment)]">Total Skills</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--green)]">
              {skills.filter((s) => s.level === "proficient" || s.level === "expert").length}
            </div>
            <div className="text-sm text-[var(--comment)]">Proficient+</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--cyan)]">
              {Math.max(...skills.map((s) => s.experience_years))}
            </div>
            <div className="text-sm text-[var(--comment)]">Max Years</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--orange)]">
              {skills.filter((s) => s.level === "learning").length}
            </div>
            <div className="text-sm text-[var(--comment)]">Learning</div>
          </div>
        </div>
      </div>
    </div>
  );
}
