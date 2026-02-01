"use client";

import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Github, Linkedin, MapPin, Clock, Briefcase } from "lucide-react";

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "// Good morning! Ready to code?";
  if (hour >= 12 && hour < 18) return "// Afternoon coding session in progress...";
  if (hour >= 18 && hour < 24) return "// Burning the midnight oil?";
  return "// Sleep is for the weak... but you should probably sleep";
}

export function ReadmePage() {
  const { personal_info, social_links, contact, education, git_timeline } = portfolioData;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Comment header */}
      <div className="text-[var(--comment)] mb-6 font-mono text-sm">
        {getTimeGreeting()}
      </div>

      {/* Main heading */}
      <h1 className="text-4xl font-bold text-[var(--pink)] mb-4">
        # Hi, I'm {personal_info.name} 👋
      </h1>

      {/* Tagline blockquote */}
      <blockquote className="border-l-4 border-[var(--purple)] pl-4 py-2 mb-8 text-[var(--comment)] italic">
        &gt; {personal_info.tagline || "Currently compiling coffee into code..."}
      </blockquote>

      {/* Quick Stats */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--cyan)] mb-4">## Quick Stats</h2>
        <div className="flex flex-wrap gap-4 text-sm font-mono">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--current-line)] rounded">
            <MapPin size={16} className="text-[var(--orange)]" />
            <span className="text-[var(--foreground)]">
              <code className="text-[var(--green)]">process.env.LOCATION</code> = "{personal_info.location.city}, {personal_info.location.country}"
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--current-line)] rounded">
            <Clock size={16} className="text-[var(--orange)]" />
            <span className="text-[var(--foreground)]">{personal_info.location.timezone}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--current-line)] rounded">
            <Briefcase size={16} className="text-[var(--orange)]" />
            <span className="text-[var(--foreground)]">
              <code className="text-[var(--pink)]">OPEN_TO_OPPORTUNITIES</code> = 
              <code className="text-[var(--purple)]"> {contact.availability.open_to_opportunities ? "true" : "false"}</code>
            </span>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--cyan)] mb-4">## Installation</h2>
        <div className="bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg p-4 font-mono text-sm">
          <div className="text-[var(--comment)] mb-2"># Clone my expertise</div>
          <div><span className="text-[var(--green)]">$</span> npm install {personal_info.name.toLowerCase().replace(" ", "-")}</div>
          <div><span className="text-[var(--green)]">$</span> git clone {social_links.github.url}</div>
          <div><span className="text-[var(--green)]">$</span> cd life && npm start</div>
        </div>
      </section>

      {/* About */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--cyan)] mb-4">## About</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-[var(--foreground)] leading-relaxed mb-4">
            I'm a <span className="text-[var(--purple)]">{personal_info.title}</span> who turns{" "}
            <code className="text-[var(--red)] bg-[var(--current-line)] px-1 rounded">bugs</code> into{" "}
            <code className="text-[var(--green)] bg-[var(--current-line)] px-1 rounded">features</code> and{" "}
            <code className="text-[var(--orange)] bg-[var(--current-line)] px-1 rounded">coffee</code> into{" "}
            <code className="text-[var(--cyan)] bg-[var(--current-line)] px-1 rounded">code</code>.
          </p>
          {personal_info.bio.long.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-[var(--foreground)] leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Education */}
      {education[0]?.institution && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--cyan)] mb-4">## Education</h2>
          <div className="bg-[var(--current-line)] rounded-lg p-4">
            <h3 className="text-lg font-bold text-[var(--orange)]">{education[0].degree}</h3>
            <p className="text-[var(--foreground)]">{education[0].institution}</p>
            <p className="text-[var(--comment)] text-sm mt-1">
              {education[0].start_date} - {education[0].end_date}
            </p>
          </div>
        </section>
      )}

      {/* Fun Facts */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--cyan)] mb-4">## Fun Facts</h2>
        <ul className="space-y-2">
          {personal_info.fun_facts.map((fact, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--foreground)]">
              <span className="text-[var(--yellow)]">•</span>
              {fact}
            </li>
          ))}
        </ul>
      </section>

      {/* Git Timeline */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--cyan)] mb-4">## Git Log (My Journey)</h2>
        <div className="font-mono text-sm space-y-4">
          {git_timeline.map((commit, i) => (
            <div key={i} className="border-l-2 border-[var(--purple)] pl-4">
              <div className="flex items-center gap-2 text-[var(--yellow)]">
                <span>commit</span>
                <span className="text-[var(--orange)]">{commit.commit_hash}</span>
                {i === 0 && (
                  <span className="text-[var(--green)] text-xs">(HEAD -&gt; main)</span>
                )}
              </div>
              <div className="text-[var(--comment)]">Date: {commit.date}</div>
              <div className="text-[var(--foreground)] mt-1 ml-4">{commit.message}</div>
              {commit.description && (
                <div className="text-[var(--comment)] text-xs mt-1 ml-4">
                  {commit.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Connect Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--cyan)] mb-4">## Connect</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href={social_links.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--current-line)] hover:bg-[var(--comment)] rounded transition-colors"
          >
            <Github size={20} className="text-[var(--foreground)]" />
            <span className="text-[var(--foreground)]">{social_links.github.handle}</span>
            <ExternalLink size={14} className="text-[var(--comment)]" />
          </a>
          <a
            href={social_links.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--current-line)] hover:bg-[var(--comment)] rounded transition-colors"
          >
            <Linkedin size={20} className="text-[var(--cyan)]" />
            <span className="text-[var(--foreground)]">{social_links.linkedin.handle}</span>
            <ExternalLink size={14} className="text-[var(--comment)]" />
          </a>
        </div>
      </section>

      {/* Footer comment */}
      <div className="text-[var(--comment)] font-mono text-sm border-t border-[var(--current-line)] pt-4 mt-8">
        <div>{"/*"}</div>
        <div className="pl-2">* README.md - Last updated: {new Date().toLocaleDateString()}</div>
        <div className="pl-2">* Built with ☕ and determination</div>
        <div className="pl-2">* Press Ctrl+K to open command palette</div>
        <div>{"*/"}</div>
      </div>
    </div>
  );
}
