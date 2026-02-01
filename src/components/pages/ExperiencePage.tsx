"use client";

import { portfolioData } from "@/data/portfolio";

export function ExperiencePage() {
  const { experience, education } = portfolioData;
  const hasExperience = experience[0]?.company;

  return (
    <div className="p-6">
      {/* Python file header */}
      <div className="font-mono text-sm mb-6">
        <div className="text-[var(--comment)]"># -*- coding: utf-8 -*-</div>
        <div className="text-[var(--comment)]">"""</div>
        <div className="text-[var(--comment)]">experience.py</div>
        <div className="text-[var(--comment)]">My professional journey and education</div>
        <div className="text-[var(--comment)]">"""</div>
      </div>

      {/* Imports */}
      <div className="font-mono text-sm mb-6">
        <div>
          <span className="text-[var(--pink)]">from</span>{" "}
          <span className="text-[var(--cyan)]">career</span>{" "}
          <span className="text-[var(--pink)]">import</span>{" "}
          <span className="text-[var(--foreground)]">Experience, Education</span>
        </div>
        <div>
          <span className="text-[var(--pink)]">from</span>{" "}
          <span className="text-[var(--cyan)]">datetime</span>{" "}
          <span className="text-[var(--pink)]">import</span>{" "}
          <span className="text-[var(--foreground)]">date</span>
        </div>
      </div>

      {/* Education Section */}
      <section className="mb-8">
        <div className="font-mono text-sm mb-4">
          <span className="text-[var(--comment)]"># Education</span>
        </div>
        <div className="font-mono text-sm">
          <div>
            <span className="text-[var(--foreground)]">education</span>{" "}
            <span className="text-[var(--pink)]">=</span>{" "}
            <span className="text-[var(--foreground)]">[</span>
          </div>

          {education.map((edu, i) => (
            <div key={i} className="pl-4 my-4 border-l-2 border-[var(--purple)] ml-2">
              <div className="bg-[var(--background-secondary)] p-4 rounded-lg border border-[var(--current-line)]">
                <div className="text-[var(--cyan)]">Education(</div>
                <div className="pl-4">
                  <div>
                    <span className="text-[var(--orange)]">institution</span>
                    <span className="text-[var(--pink)]">=</span>
                    <span className="text-[var(--yellow)]">"{edu.institution}"</span>
                    <span className="text-[var(--foreground)]">,</span>
                  </div>
                  <div>
                    <span className="text-[var(--orange)]">degree</span>
                    <span className="text-[var(--pink)]">=</span>
                    <span className="text-[var(--yellow)]">"{edu.degree}"</span>
                    <span className="text-[var(--foreground)]">,</span>
                  </div>
                  <div>
                    <span className="text-[var(--orange)]">field</span>
                    <span className="text-[var(--pink)]">=</span>
                    <span className="text-[var(--yellow)]">"{edu.field_of_study}"</span>
                    <span className="text-[var(--foreground)]">,</span>
                  </div>
                  <div>
                    <span className="text-[var(--orange)]">period</span>
                    <span className="text-[var(--pink)]">=</span>
                    <span className="text-[var(--foreground)]">(</span>
                    <span className="text-[var(--yellow)]">"{edu.start_date}"</span>
                    <span className="text-[var(--foreground)]">, </span>
                    <span className="text-[var(--yellow)]">"{edu.end_date}"</span>
                    <span className="text-[var(--foreground)]">)</span>
                  </div>
                </div>
                <div className="text-[var(--cyan)]">),</div>
              </div>
            </div>
          ))}

          <div>
            <span className="text-[var(--foreground)]">]</span>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <div className="font-mono text-sm mb-4">
          <span className="text-[var(--comment)]"># Work Experience</span>
        </div>
        
        {hasExperience ? (
          <div className="font-mono text-sm">
            <div>
              <span className="text-[var(--foreground)]">experience</span>{" "}
              <span className="text-[var(--pink)]">=</span>{" "}
              <span className="text-[var(--foreground)]">[</span>
            </div>

            {experience.map((exp, i) => (
              <div key={i} className="pl-4 my-4 border-l-2 border-[var(--green)] ml-2">
                <div className="bg-[var(--background-secondary)] p-4 rounded-lg border border-[var(--current-line)]">
                  <div className="text-[var(--cyan)]">Experience(</div>
                  <div className="pl-4">
                    <div>
                      <span className="text-[var(--orange)]">company</span>
                      <span className="text-[var(--pink)]">=</span>
                      <span className="text-[var(--yellow)]">"{exp.company}"</span>
                      <span className="text-[var(--foreground)]">,</span>
                    </div>
                    <div>
                      <span className="text-[var(--orange)]">position</span>
                      <span className="text-[var(--pink)]">=</span>
                      <span className="text-[var(--yellow)]">"{exp.position}"</span>
                      <span className="text-[var(--foreground)]">,</span>
                    </div>
                    <div>
                      <span className="text-[var(--orange)]">current</span>
                      <span className="text-[var(--pink)]">=</span>
                      <span className="text-[var(--purple)]">{exp.current ? "True" : "False"}</span>
                    </div>
                  </div>
                  <div className="text-[var(--cyan)]">),</div>
                </div>
              </div>
            ))}

            <div>
              <span className="text-[var(--foreground)]">]</span>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--background-secondary)] p-6 rounded-lg border border-[var(--current-line)] text-center">
            <div className="font-mono text-[var(--comment)] mb-4">
              # TODO: Add work experience
            </div>
            <div className="text-[var(--foreground)]">
              <span className="text-[var(--orange)]">experience</span>{" "}
              <span className="text-[var(--pink)]">=</span>{" "}
              <span className="text-[var(--foreground)]">[]</span>{" "}
              <span className="text-[var(--comment)]"># Currently building my career!</span>
            </div>
            <div className="mt-4 text-[var(--yellow)]">
              Fresh graduate looking for exciting opportunities! 🚀
            </div>
          </div>
        )}
      </section>

      {/* Main function */}
      <div className="font-mono text-sm mt-8">
        <div className="text-[var(--comment)]"># Let's connect!</div>
        <div className="mt-2">
          <span className="text-[var(--pink)]">if</span>{" "}
          <span className="text-[var(--foreground)]">__name__</span>{" "}
          <span className="text-[var(--pink)]">==</span>{" "}
          <span className="text-[var(--yellow)]">"__main__"</span>
          <span className="text-[var(--foreground)]">:</span>
        </div>
        <div className="pl-4">
          <span className="text-[var(--green)]">print</span>
          <span className="text-[var(--foreground)]">(</span>
          <span className="text-[var(--yellow)]">"Open to new opportunities!"</span>
          <span className="text-[var(--foreground)]">)</span>
        </div>
      </div>
    </div>
  );
}
