"use client";

import { portfolioData } from "@/data/portfolio";

export function EnvPage() {
  const { personal_info, contact, social_links } = portfolioData;

  return (
    <div className="p-6">
      {/* File header comment */}
      <div className="font-mono text-sm mb-6">
        <div className="text-[var(--comment)]"># Environment Variables</div>
        <div className="text-[var(--comment)]"># ⚠️ Warning: Don't commit this file to git!</div>
        <div className="text-[var(--comment)]"># (Just kidding, this is a portfolio 😄)</div>
      </div>

      <div className="font-mono text-sm space-y-4 bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg p-6">
        {/* Personal Info */}
        <div className="border-b border-[var(--current-line)] pb-4">
          <div className="text-[var(--comment)] mb-2"># Personal Info</div>
          <div>
            <span className="text-[var(--cyan)]">NAME</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{personal_info.name}"</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">TITLE</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{personal_info.title}"</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">TAGLINE</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{personal_info.tagline}"</span>
          </div>
        </div>

        {/* Location */}
        <div className="border-b border-[var(--current-line)] pb-4">
          <div className="text-[var(--comment)] mb-2"># Location</div>
          <div>
            <span className="text-[var(--cyan)]">LOCATION</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{personal_info.location.city}, {personal_info.location.country}"</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">TIMEZONE</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{personal_info.location.timezone}"</span>
          </div>
        </div>

        {/* Availability */}
        <div className="border-b border-[var(--current-line)] pb-4">
          <div className="text-[var(--comment)] mb-2"># Availability Flags</div>
          <div>
            <span className="text-[var(--cyan)]">OPEN_TO_OPPORTUNITIES</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--purple)]">{contact.availability.open_to_opportunities ? "true" : "false"}</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">OPEN_TO_FREELANCE</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--purple)]">{contact.availability.freelance ? "true" : "false"}</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">OPEN_TO_FULL_TIME</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--purple)]">{contact.availability.full_time ? "true" : "false"}</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">OPEN_TO_REMOTE</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--purple)]">{contact.availability.remote ? "true" : "false"}</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">OPEN_TO_RELOCATION</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--purple)]">{contact.availability.relocation ? "true" : "false"}</span>
          </div>
        </div>

        {/* Contact */}
        <div className="border-b border-[var(--current-line)] pb-4">
          <div className="text-[var(--comment)] mb-2"># Contact</div>
          <div>
            <span className="text-[var(--cyan)]">EMAIL</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{contact.email}"</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">PREFERRED_CONTACT</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{contact.preferred_contact_method}"</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">RESPONSE_TIME</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{contact.response_time}"</span>
          </div>
        </div>

        {/* Social */}
        <div className="border-b border-[var(--current-line)] pb-4">
          <div className="text-[var(--comment)] mb-2"># Social</div>
          <div>
            <span className="text-[var(--cyan)]">GITHUB_URL</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{social_links.github.url}"</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">LINKEDIN_URL</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"{social_links.linkedin.url}"</span>
          </div>
        </div>

        {/* Secret Stats (hidden by default) */}
        <div>
          <div className="text-[var(--comment)] mb-2"># Secret Stats (shhh... 🤫)</div>
          <div>
            <span className="text-[var(--cyan)]">COFFEE_LEVEL</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--orange)]">∞</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">BUGS_CREATED</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--orange)]">{portfolioData.easter_egg_stats.bugs_created}</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">BUGS_FIXED</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--orange)]">{portfolioData.easter_egg_stats.bugs_fixed}</span>
          </div>
          <div>
            <span className="text-[var(--cyan)]">MOTIVATION_LEVEL</span>
            <span className="text-[var(--pink)]">=</span>
            <span className="text-[var(--yellow)]">"depends_on_coffee"</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="font-mono text-sm mt-6 text-[var(--comment)]">
        <div># TIP: Use Ctrl+K to open the command palette</div>
        <div># TIP: Try the Konami code for a surprise! ↑↑↓↓←→←→BA</div>
      </div>
    </div>
  );
}
