// Portfolio Data - Edit this file to update your information

export type SkillLevel = "learning" | "comfortable" | "proficient" | "expert";
export type SkillCategory = "frontend" | "backend" | "tools" | "other";
export type ProjectStatus = "COMPLETED" | "IN_PROGRESS" | "ARCHIVED";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  experience_years: number;
  fun_fact?: string;
}

export interface Project {
  name: string;
  description: string;
  long_description: string;
  tech_stack: string[];
  highlights: string[];
  demo_url: string;
  github_url: string;
  image_url: string;
  status: ProjectStatus;
  date_completed: string;
  your_role: string;
  team_size: string;
}

export const portfolioData = {
  personal_info: {
    name: "Tim Hofman",
    title: "Full-Stack Developer",
    tagline: "Turning coffee into code since 2021",
    location: {
      city: "Kontich",
      state: "Antwerp",
      country: "Belgium",
      timezone: "CET (Central European Time)"
    },
    bio: {
      short: "Full-stack developer passionate about building elegant solutions to complex problems.",
      long: `I'm a full-stack developer based in Belgium with a passion for creating intuitive and performant web applications. With experience spanning from backend systems in Java and .NET to modern frontend frameworks like React, I enjoy working across the entire stack.

When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or debugging that one mysterious issue that only happens in production. I believe in writing clean, maintainable code and continuous learning.

Currently pursuing my Bachelor's in Applied Computer Science while building projects that challenge me to grow as a developer.`
    },
    profile_image: "/profile.jpg",
    fun_facts: [
      "I've mass around 10,000 git commits and counting",
      "My debugging process involves explaining the problem to my rubber duck",
      "I once fixed a production bug at 3 AM in my pajamas"
    ]
  },

  contact: {
    email: "tim.hofman25@proton.me",
    phone: "+32 468 24 36 04",
    website: "",
    availability: {
      open_to_opportunities: true,
      freelance: true,
      full_time: true,
      part_time: false,
      contract: true,
      remote: true,
      relocation: false
    },
    preferred_contact_method: "email",
    response_time: "< 24 hours"
  },

  social_links: {
    github: {
      url: "https://github.com/lunararch",
      handle: "@lunararch"
    },
    linkedin: {
      url: "https://www.linkedin.com/in/hofman-tim/",
      handle: "Tim Hofman"
    },
    other: []
  },

  skills: [
    {
      name: "Dotnet",
      category: "backend" as const,
      level: "proficient" as const,
      experience_years: 6,
      fun_fact: "If it compiles, I trust it… mostly"
    },
    {
      name: "JavaScript",
      category: "frontend" as const,
      level: "comfortable" as const,
      experience_years: 3,
      fun_fact: "Once debugged a semicolon for 3 hours"
    },
    {
      name: "React",
      category: "frontend" as const,
      level: "comfortable" as const,
      experience_years: 1,
      fun_fact: "UseEffect is my best friend and worst enemy"
    },
    {
      name: "TypeScript",
      category: "frontend" as const,
      level: "proficient" as const,
      experience_years: 3,
      fun_fact: "Still discovering new type tricks every day"
    },
    {
      name: "Java",
      category: "backend" as const,
      level: "proficient" as const,
      experience_years: 4,
      fun_fact: "Still typing getters and setters in my sleep"
    },
    {
      name: "Go",
      category: "backend" as const,
      level: "learning" as const,
      experience_years: 1,
      fun_fact: "Gopher mascot is my spirit animal"
    },
    {
      name: "Vue.js",
      category: "frontend" as const,
      level: "learning" as const,
      experience_years: 1,
      fun_fact: "The progressive framework that keeps surprising me"
    },
    {
      name: "SQL",
      category: "backend" as const,
      level: "proficient" as const,
      experience_years: 5,
      fun_fact: "I dream in JOINs and WHERE clauses"
    },
    {
      name: "Python",
      category: "backend" as const,
      level: "comfortable" as const,
      experience_years: 4,
      fun_fact: "Tabs vs spaces? Still can't decide"
    },
    {
      name: "Git",
      category: "tools" as const,
      level: "proficient" as const,
      experience_years: 5,
      fun_fact: "Master of 'git commit -m fix stuff'"
    }
  ],

  projects: [
    {
      name: "Arc",
      description: "Arc is a digital platform where players can discover and play various web-based board games",
      long_description: "Arc serves as a central hub for board game enthusiasts, providing a seamless experience from browsing available games to playing with friends or strangers online.",
      tech_stack: ["Java", "Spring Boot", "React", "Node.js", "PostgreSQL", "Keycloak"],
      highlights: [
        "Seamless integration of multiple board games into a single platform",
        "Profile management with game statistics, achievements and customization options",
        "Friend system for easy game invitations and social interactions"
      ],
      demo_url: "",
      github_url: "https://github.com/lunararch/arc",
      image_url: "/projects/arc.png",
      status: "COMPLETED" as const,
      date_completed: "2026-01",
      your_role: "Full-Stack Developer / Group Project",
      team_size: "4 people"
    },
    {
      name: "Go",
      description: "A boardgame inspired by the ancient game of Go created for the Arc platform.",
      long_description: "An online adaptation of the classic board game Go, designed to be played on the Arc platform. It features real-time multiplayer functionality, an intuitive user interface, and AI opponents of varying difficulty levels.",
      tech_stack: ["Java", "Spring Boot", "React", "Node.js", "PostgreSQL"],
      highlights: [
        "Real-time multiplayer gameplay",
        "Customizable board sizes and rulesets",
        "AI opponents with adjustable difficulty levels"
      ],
      demo_url: "",
      github_url: "https://github.com/lunararch/go",
      image_url: "/projects/go.png",
      status: "COMPLETED" as const,
      date_completed: "2026-01",
      your_role: "Full-Stack Developer",
      team_size: "Solo"
    },
    {
      name: "Bliss",
      description: "A customizable AI personality with local llm integration.",
      long_description: "Bliss is an AI companion that allows users to create and interact with personalized AI personalities. It leverages local large language models (LLMs) to ensure privacy and customization, enabling users to tailor their AI's behavior, responses, and knowledge base according to their preferences.",
      tech_stack: ["Python", "LMStudio"],
      highlights: [
        "Customizable AI personalities",
        "Speech recognition and text-to-speech capabilities",
        "Text to Speech integration for natural conversations"
      ],
      demo_url: "",
      github_url: "https://github.com/lunararch/bliss",
      image_url: "/projects/bliss.png",
      status: "ARCHIVED" as const,
      date_completed: "2025-07",
      your_role: "Full-Stack Developer",
      team_size: "Solo"
    },
    {
      name: "Parselt",
      description: "A dual-interface markdown editor built with Go, featuring both terminal and GUI applications with live preview functionality.",
      long_description: "Parselt is a versatile markdown editor designed for both terminal enthusiasts and GUI users. The terminal application offers a distraction-free writing environment, while the GUI version provides a user-friendly interface with live preview capabilities, allowing users to see their formatted markdown in real-time as they write.",
      tech_stack: ["Go", "Charm"],
      highlights: [
        "Dual-interface markdown editor with terminal and GUI applications",
        "Live preview functionality for real-time markdown rendering",
        "Lightweight and fast performance"
      ],
      demo_url: "",
      github_url: "https://github.com/lunararch/parselt",
      image_url: "/projects/parselt.png",
      status: "COMPLETED" as const,
      date_completed: "2025-07",
      your_role: "Full-Stack Developer",
      team_size: "Solo"
    }
  ],

  experience: [
    {
      company: "",
      position: "",
      location: "",
      start_date: "",
      end_date: "",
      current: true,
      description: "",
      achievements: [],
      tech_used: []
    }
  ],

  education: [
    {
      institution: "Karel de Grote University of Applied Sciences and Arts",
      degree: "Bachelor of Science in Applied Computer Science",
      field_of_study: "Applied Computer Science",
      start_date: "2021-09",
      end_date: "2026-06",
      relevant_coursework: []
    }
  ],

  git_timeline: [
    {
      commit_hash: "3b9f2a1",
      date: "now",
      message: "docs: updated portfolio with new projects",
      description: "Currently working on my portfolio and latest projects"
    },
    {
      commit_hash: "a4f3b91",
      date: "2 years ago",
      message: "feat: learned React hooks and fell in love",
      description: "Started diving deep into React and modern JavaScript"
    },
    {
      commit_hash: "8d2c1e5",
      date: "1 year ago",
      message: "fix: overcame imposter syndrome (mostly)",
      description: "Gained confidence in my abilities as a developer"
    },
    {
      commit_hash: "3b9f2a1",
      date: "6 months ago",
      message: "refactor: completely rewrote career goals",
      description: "Decided to focus on full-stack development"
    },
    {
      commit_hash: "7c8d4f2",
      date: "3 years ago",
      message: "Initial commit: Started my coding journey",
      description: "Wrote my first Hello World program"
    }
  ],

  terminal_jokes: [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "Why do Java developers wear glasses? Because they don't C#",
    "There are 10 types of people: those who understand binary and those who don't",
    "Why did the programmer quit his job? Because he didn't get arrays",
    "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'"
  ],

  easter_egg_stats: {
    bugs_created: 9001,
    bugs_fixed: 9000,
    coffee_consumed: "∞ cups",
    stack_overflow_visits: "too_many_to_count",
    lines_of_code: 500000,
    projects_started: 127,
    projects_finished: 42,
    keyboard_destroyed: 3,
    all_nighters_pulled: 47
  },

  resume: {
    pdf_url: "data/cv-english.pdf",
    last_updated: "2025-05"
  },

  theme_preferences: {
    default_theme: "dracula",
    available_themes: [
      "dracula",
      "monokai",
      "nord",
      "one-dark",
      "solarized-dark",
      "github-light"
    ]
  },

  seo: {
    title: "Tim Hofman | Full-Stack Developer Portfolio",
    description: "Portfolio of Tim Hofman - Full-Stack Developer specializing in Java, Node.js, and modern web technologies",
    keywords: [
      "web developer",
      "full-stack developer",
      "portfolio",
      "Tim Hofman"
    ],
    og_image: "/og-image.png"
  }
};
