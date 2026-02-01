"use client";

import { portfolioData } from "@/data/portfolio";
import { Download, ExternalLink, FileText } from "lucide-react";

export function ResumePage() {
  const { resume } = portfolioData;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* File info */}
      <div className="font-mono text-sm mb-8">
        <div className="text-[var(--comment)]">{"/**"}</div>
        <div className="text-[var(--comment)]"> * resume.pdf</div>
        <div className="text-[var(--comment)]"> * Last updated: {resume.last_updated}</div>
        <div className="text-[var(--comment)]">{" */"}</div>
      </div>

      {/* PDF Preview placeholder */}
      <div className="bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg p-8 text-center">
        <div className="mb-6">
          <FileText size={64} className="mx-auto text-[var(--purple)] mb-4" />
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
            {portfolioData.personal_info.name}'s Resume
          </h2>
          <p className="text-[var(--comment)]">
            Full-Stack Developer | {portfolioData.personal_info.location.city}, {portfolioData.personal_info.location.country}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={resume.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--purple)] text-[var(--foreground)] rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <ExternalLink size={20} />
            View Resume
          </a>
          <a
            href={resume.pdf_url}
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--current-line)] text-[var(--foreground)] rounded-lg hover:bg-[var(--comment)] transition-colors font-medium"
          >
            <Download size={20} />
            Download PDF
          </a>
        </div>

        <div className="mt-8 text-[var(--comment)] text-sm">
          <span className="text-[var(--green)]">$</span> curl -O {resume.pdf_url}
        </div>
      </div>

      {/* Quick summary */}
      <div className="mt-8 font-mono text-sm">
        <div className="text-[var(--comment)] mb-4">// Quick Summary</div>
        <div className="bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[var(--cyan)]">Skills</div>
              <div className="text-[var(--foreground)]">{portfolioData.skills.length}+ technologies</div>
            </div>
            <div>
              <div className="text-[var(--cyan)]">Projects</div>
              <div className="text-[var(--foreground)]">{portfolioData.projects.length} featured</div>
            </div>
            <div>
              <div className="text-[var(--cyan)]">Education</div>
              <div className="text-[var(--foreground)]">{portfolioData.education[0]?.degree?.split(" ").slice(0, 2).join(" ") || "N/A"}</div>
            </div>
            <div>
              <div className="text-[var(--cyan)]">Status</div>
              <div className="text-[var(--green)]">Open to work</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
