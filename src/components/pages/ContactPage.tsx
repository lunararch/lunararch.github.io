"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Send, Check, AlertCircle, ExternalLink, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const { contact, social_links } = portfolioData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you'd send to an API
    // For now, we'll just open the mailto link
    const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    setStatus("success");
    
    setTimeout(() => {
      setStatus("idle");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* JSON display */}
      <div className="font-mono text-sm mb-8">
        <div className="text-[var(--foreground)]">{"{"}</div>
        
        {/* Status */}
        <div className="pl-4">
          <span className="text-[var(--purple)]">"status"</span>
          <span className="text-[var(--foreground)]">: </span>
          <span className="text-[var(--green)]">"AVAILABLE_FOR_OPPORTUNITIES"</span>
          <span className="text-[var(--foreground)]">,</span>
        </div>

        {/* Email */}
        <div className="pl-4">
          <span className="text-[var(--purple)]">"email"</span>
          <span className="text-[var(--foreground)]">: {"{"}</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"address"</span>
          <span className="text-[var(--foreground)]">: </span>
          <a 
            href={`mailto:${contact.email}`}
            className="text-[var(--yellow)] hover:underline"
          >
            "{contact.email}"
          </a>
          <span className="text-[var(--foreground)]">,</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"response_time"</span>
          <span className="text-[var(--foreground)]">: </span>
          <span className="text-[var(--yellow)]">"{contact.response_time}"</span>
        </div>
        <div className="pl-4">
          <span className="text-[var(--foreground)]">{"}"},</span>
        </div>

        {/* Social Links */}
        <div className="pl-4 mt-2">
          <span className="text-[var(--purple)]">"social_links"</span>
          <span className="text-[var(--foreground)]">: {"{"}</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"github"</span>
          <span className="text-[var(--foreground)]">: </span>
          <a 
            href={social_links.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--yellow)] hover:underline"
          >
            "{social_links.github.url}"
          </a>
          <span className="text-[var(--foreground)]">,</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"linkedin"</span>
          <span className="text-[var(--foreground)]">: </span>
          <a 
            href={social_links.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--yellow)] hover:underline"
          >
            "{social_links.linkedin.url}"
          </a>
        </div>
        <div className="pl-4">
          <span className="text-[var(--foreground)]">{"}"},</span>
        </div>

        {/* Location */}
        <div className="pl-4 mt-2">
          <span className="text-[var(--purple)]">"location"</span>
          <span className="text-[var(--foreground)]">: {"{"}</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"city"</span>
          <span className="text-[var(--foreground)]">: </span>
          <span className="text-[var(--yellow)]">"{portfolioData.personal_info.location.city}"</span>
          <span className="text-[var(--foreground)]">,</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"country"</span>
          <span className="text-[var(--foreground)]">: </span>
          <span className="text-[var(--yellow)]">"{portfolioData.personal_info.location.country}"</span>
          <span className="text-[var(--foreground)]">,</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"open_to_remote"</span>
          <span className="text-[var(--foreground)]">: </span>
          <span className="text-[var(--purple)]">{contact.availability.remote ? "true" : "false"}</span>
        </div>
        <div className="pl-4">
          <span className="text-[var(--foreground)]">{"}"},</span>
        </div>

        {/* Availability */}
        <div className="pl-4 mt-2">
          <span className="text-[var(--purple)]">"availability"</span>
          <span className="text-[var(--foreground)]">: {"{"}</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"freelance"</span>
          <span className="text-[var(--foreground)]">: </span>
          <span className="text-[var(--purple)]">{contact.availability.freelance ? "true" : "false"}</span>
          <span className="text-[var(--foreground)]">,</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"full_time"</span>
          <span className="text-[var(--foreground)]">: </span>
          <span className="text-[var(--purple)]">{contact.availability.full_time ? "true" : "false"}</span>
          <span className="text-[var(--foreground)]">,</span>
        </div>
        <div className="pl-8">
          <span className="text-[var(--cyan)]">"contract"</span>
          <span className="text-[var(--foreground)]">: </span>
          <span className="text-[var(--purple)]">{contact.availability.contract ? "true" : "false"}</span>
        </div>
        <div className="pl-4">
          <span className="text-[var(--foreground)]">{"}"}</span>
        </div>

        <div className="text-[var(--foreground)]">{"}"}</div>
      </div>

      {/* Quick contact cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 p-4 bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg hover:border-[var(--purple)] transition-colors"
        >
          <Mail className="text-[var(--pink)]" size={24} />
          <div>
            <div className="text-sm text-[var(--comment)]">Email</div>
            <div className="text-[var(--foreground)] text-sm truncate">{contact.email}</div>
          </div>
        </a>

        <a
          href={social_links.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg hover:border-[var(--purple)] transition-colors"
        >
          <Github className="text-[var(--foreground)]" size={24} />
          <div>
            <div className="text-sm text-[var(--comment)]">GitHub</div>
            <div className="text-[var(--foreground)] text-sm">{social_links.github.handle}</div>
          </div>
          <ExternalLink size={14} className="ml-auto text-[var(--comment)]" />
        </a>

        <a
          href={social_links.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg hover:border-[var(--purple)] transition-colors"
        >
          <Linkedin className="text-[var(--cyan)]" size={24} />
          <div>
            <div className="text-sm text-[var(--comment)]">LinkedIn</div>
            <div className="text-[var(--foreground)] text-sm">{social_links.linkedin.handle}</div>
          </div>
          <ExternalLink size={14} className="ml-auto text-[var(--comment)]" />
        </a>
      </div>

      {/* Contact form styled as HTTP request */}
      <div className="font-mono text-sm">
        <div className="mb-4">
          <span className="text-[var(--pink)]">POST</span>{" "}
          <span className="text-[var(--cyan)]">/api/contact</span>{" "}
          <span className="text-[var(--comment)]">HTTP/1.1</span>
        </div>
        <div className="text-[var(--comment)] mb-2">Host: portfolio.dev</div>
        <div className="text-[var(--comment)] mb-2">Content-Type: application/json</div>
        <div className="text-[var(--comment)] mb-4">Authorization: Bearer visitor-token</div>

        <form onSubmit={handleSubmit} className="bg-[var(--background-secondary)] border border-[var(--current-line)] rounded-lg p-6">
          <div className="text-[var(--foreground)] mb-4">{"{"}</div>

          {/* Name field */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 pl-4">
            <label htmlFor="name" className="text-[var(--purple)] shrink-0">"name":</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              required
              className="flex-1 bg-[var(--current-line)] text-[var(--yellow)] px-3 py-2 rounded border border-[var(--comment)] outline-none focus:border-[var(--purple)] placeholder-[var(--comment)]"
            />
          </div>

          {/* Email field */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 pl-4">
            <label htmlFor="email" className="text-[var(--purple)] shrink-0">"email":</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              required
              className="flex-1 bg-[var(--current-line)] text-[var(--yellow)] px-3 py-2 rounded border border-[var(--comment)] outline-none focus:border-[var(--purple)] placeholder-[var(--comment)]"
            />
          </div>

          {/* Subject field */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 pl-4">
            <label htmlFor="subject" className="text-[var(--purple)] shrink-0">"subject":</label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="What's this about?"
              required
              className="flex-1 bg-[var(--current-line)] text-[var(--yellow)] px-3 py-2 rounded border border-[var(--comment)] outline-none focus:border-[var(--purple)] placeholder-[var(--comment)]"
            />
          </div>

          {/* Message field */}
          <div className="flex flex-col gap-2 mb-4 pl-4">
            <label htmlFor="message" className="text-[var(--purple)]">"message":</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Your message here..."
              required
              rows={5}
              className="w-full bg-[var(--current-line)] text-[var(--yellow)] px-3 py-2 rounded border border-[var(--comment)] outline-none focus:border-[var(--purple)] placeholder-[var(--comment)] resize-none"
            />
          </div>

          <div className="text-[var(--foreground)] mb-4">{"}"}</div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={status === "sending" || status === "success"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded font-bold transition-all ${
              status === "success"
                ? "bg-[var(--green)] text-[var(--background)]"
                : status === "error"
                ? "bg-[var(--red)] text-[var(--foreground)]"
                : "bg-[var(--purple)] text-[var(--foreground)] hover:opacity-90"
            }`}
          >
            {status === "sending" ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-[var(--foreground)] border-t-transparent rounded-full"
                />
                Sending Request...
              </>
            ) : status === "success" ? (
              <>
                <Check size={20} />
                HTTP 200 OK - Message Sent!
              </>
            ) : status === "error" ? (
              <>
                <AlertCircle size={20} />
                HTTP 500 - Error Sending
              </>
            ) : (
              <>
                <Send size={20} />
                Send Request 📨
              </>
            )}
          </motion.button>
        </form>

        {/* Console output */}
        <div className="mt-4 text-[var(--comment)]">
          <span>{"// Response will be logged to console"}</span>
        </div>
      </div>

      {/* Fun fact */}
      <div className="mt-8 p-4 bg-[var(--current-line)] rounded-lg text-center">
        <span className="text-[var(--comment)]">💡 Fun fact: </span>
        <span className="text-[var(--yellow)]">I respond faster when you mention coffee ☕</span>
      </div>
    </div>
  );
}
