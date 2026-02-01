"use client";

import { useState } from "react";
import { portfolioData, Project } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Play, X, Code, Users, Calendar, Tag } from "lucide-react";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed top-[10%] left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl max-h-[80vh] overflow-y-auto
                   bg-[var(--background)] border border-[var(--current-line)] rounded-lg shadow-2xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--current-line)]">
          <h2 className="text-xl font-bold text-[var(--green)]">{project.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--current-line)] rounded transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm text-[var(--comment)] mb-2">Description</h3>
            <p className="text-[var(--foreground)]">{project.long_description}</p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} className="text-[var(--cyan)]" />
              <span className="text-[var(--comment)]">Team:</span>
              <span className="text-[var(--foreground)]">{project.team_size}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-[var(--orange)]" />
              <span className="text-[var(--comment)]">Completed:</span>
              <span className="text-[var(--foreground)]">{project.date_completed || "In Progress"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm col-span-2">
              <Code size={16} className="text-[var(--pink)]" />
              <span className="text-[var(--comment)]">Role:</span>
              <span className="text-[var(--foreground)]">{project.your_role}</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm text-[var(--comment)] mb-2 flex items-center gap-2">
              <Tag size={14} />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[var(--current-line)] text-[var(--cyan)] text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-sm text-[var(--comment)] mb-2">Key Features</h3>
            <ul className="space-y-2">
              {project.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-[var(--foreground)]">
                  <span className="text-[var(--green)]">✓</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-4 border-t border-[var(--current-line)]">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--current-line)] hover:bg-[var(--purple)] 
                         text-[var(--foreground)] rounded transition-colors"
              >
                <Github size={18} />
                View Source
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--green)] hover:opacity-90
                         text-[var(--background)] rounded transition-opacity"
              >
                <Play size={18} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const colors = {
    COMPLETED: "bg-[var(--green)] text-[var(--background)]",
    IN_PROGRESS: "bg-[var(--yellow)] text-[var(--background)]",
    ARCHIVED: "bg-[var(--comment)] text-[var(--foreground)]",
  };

  return (
    <span className={`px-2 py-0.5 text-xs rounded ${colors[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const { projects } = portfolioData;

  const allTechs = Array.from(new Set(projects.flatMap((p) => p.tech_stack)));

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tech_stack.includes(filter) || p.status === filter);

  return (
    <div className="p-6">
      {/* File header comment */}
      <div className="font-mono text-sm mb-6">
        <div className="text-[var(--comment)]">{"/**"}</div>
        <div className="text-[var(--comment)]"> * @file projects.js</div>
        <div className="text-[var(--comment)]"> * @description All my awesome projects in one place</div>
        <div className="text-[var(--comment)]">{" */"}</div>
      </div>

      {/* Filter */}
      <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-sm">
        <span className="text-[var(--pink)]">const</span>
        <span className="text-[var(--foreground)]">filtered</span>
        <span className="text-[var(--pink)]">=</span>
        <span className="text-[var(--cyan)]">projects</span>
        <span className="text-[var(--foreground)]">.</span>
        <span className="text-[var(--green)]">filter</span>
        <span className="text-[var(--foreground)]">(</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[var(--current-line)] text-[var(--foreground)] px-2 py-1 rounded border border-[var(--comment)] outline-none focus:border-[var(--purple)]"
        >
          <option value="all">all</option>
          <optgroup label="Status">
            <option value="COMPLETED">COMPLETED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </optgroup>
          <optgroup label="Tech">
            {allTechs.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </optgroup>
        </select>
        <span className="text-[var(--foreground)]">);</span>
        <span className="text-[var(--comment)]">// {filteredProjects.length} results</span>
      </div>

      {/* Projects array */}
      <div className="font-mono text-sm">
        <div className="mb-2">
          <span className="text-[var(--pink)]">const</span>{" "}
          <span className="text-[var(--foreground)]">projects</span>{" "}
          <span className="text-[var(--pink)]">=</span>{" "}
          <span className="text-[var(--foreground)]">[</span>
        </div>

        <div className="space-y-4 pl-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg p-4
                       hover:border-[var(--purple)] cursor-pointer transition-all hover:shadow-lg hover:shadow-[var(--purple)]/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Project header */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[var(--foreground)]">{"{"}</span>
                    <h3 className="text-lg font-bold text-[var(--green)]">{project.name}</h3>
                    <StatusBadge status={project.status} />
                  </div>

                  {/* Description as string */}
                  <div className="pl-4 mb-3">
                    <span className="text-[var(--purple)]">description</span>
                    <span className="text-[var(--foreground)]">: </span>
                    <span className="text-[var(--yellow)]">"{project.description}"</span>
                    <span className="text-[var(--foreground)]">,</span>
                  </div>

                  {/* Tech stack preview */}
                  <div className="pl-4 mb-2">
                    <span className="text-[var(--purple)]">tech_stack</span>
                    <span className="text-[var(--foreground)]">: [</span>
                    {project.tech_stack.slice(0, 4).map((tech, i) => (
                      <span key={tech}>
                        <span className="text-[var(--yellow)]">"{tech}"</span>
                        {i < Math.min(project.tech_stack.length, 4) - 1 && (
                          <span className="text-[var(--foreground)]">, </span>
                        )}
                      </span>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="text-[var(--comment)]">
                        , +{project.tech_stack.length - 4} more
                      </span>
                    )}
                    <span className="text-[var(--foreground)]">]</span>
                  </div>

                  <div className="text-[var(--foreground)] pl-4">{"}"}</div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-[var(--current-line)] hover:bg-[var(--purple)] rounded transition-colors"
                      aria-label="View GitHub"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-[var(--green)] text-[var(--background)] rounded transition-opacity hover:opacity-80"
                      aria-label="View Demo"
                    >
                      <Play size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-2">
          <span className="text-[var(--foreground)]">];</span>
        </div>
      </div>

      {/* Export statement */}
      <div className="font-mono text-sm mt-6">
        <span className="text-[var(--pink)]">export</span>{" "}
        <span className="text-[var(--pink)]">default</span>{" "}
        <span className="text-[var(--foreground)]">projects;</span>
      </div>

      {/* Footer comments */}
      <div className="font-mono text-sm mt-8 text-[var(--comment)]">
        <div>{"/*"}</div>
        <div> * TODO: Build that time machine app</div>
        <div> * FIXME: Still debugging my sleep schedule</div>
        <div> * NOTE: All projects built with ☕ and determination</div>
        <div>{" */"}</div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
