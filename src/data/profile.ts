export type Profile = {
  name: string;
  headline: string;
  summary: string;
  availability: string[];
  strengths: string[];
  metrics: string[];
  stack: string[];  
  links: {
    github?: string;
    roblox?: string;
    cv?: string;
  };
};

export const profile: Profile = {
  name: "Itipat \"Lance\" Songsampansakul",

  headline:
    "Frontend Developer (TypeScript / Nuxt / React) with Systems Engineering Background",

  summary:
  "Computer Science graduate building interactive web interfaces using TypeScript, Nuxt, and React. Experienced in API-driven UI, data visualization, and responsive interface design. My background in game systems engineering helps me approach frontend development with strong attention to performance, state management, and user interaction.",

  strengths: [
    "Deterministic server authority over client trust",
    "Explicit tick scheduling (AI / simulation / networking decoupled)",
    "Hybrid delta + snapshot replication",
    "Join-in-progress state reconstruction",
    "Simulation vs rendering world separation",
    "Bandwidth budgets treated as design constraints",
    "Systems designed for extension without mutation side effects",
  ],

  metrics: [
    "React",
    "Nuxt 4",
    "TypeScript",
    "Tailwind CSS",
    "Typed Luau",
    "JECS (ECS architecture)",
    "Blink (custom networking)",
    "Rojo / Wally / Lune",
    "ProfileService",
    "Unity (C# modular systems)",
    "Git / VSCode",
  ],

  stack: [
  ],

  availability: [
    "~40 hours/week",
    "Comfortable overlapping US/EU time zones",
  ],

  links: {
    github: "https://github.com/ItipatS",
    roblox: "https://www.roblox.com/users/94439374/profile",
    cv: "https://drive.google.com/file/d/1UsJg4483w0TwDLKzzeAKLkIs6HY3Ac-k/view?usp=sharing",
  },
};