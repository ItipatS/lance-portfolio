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
    "Simulation & Systems Engineer (Deterministic Authority • Networking • ECS)",

  summary:
    "I design server-authoritative simulations with explicit tick scheduling, bandwidth-aware replication, and clean authority boundaries. My work focuses on deterministic ECS-style architectures, hybrid delta + snapshot networking, and separating simulation from rendering to maintain predictable behavior under load. Roblox is the runtime I use to validate these systems — not the abstraction I rely on.",

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
    "1,500+ entities simulated",
    "~80–200 KB/s measured replication",
    "AI 8 Hz • Simulation 20 Hz • Render 60 Hz",
    "Delta + snapshot hybrid networking",
    "Client ECS mirror reconstruction",
  ],

  stack: [
    "Typed Luau",
    "JECS (ECS architecture)",
    "Blink (custom networking)",
    "Rojo / Wally / Lune",
    "ProfileService",
    "Unity (C# modular systems)",
    "Git / VSCode",
  ],

  availability: [
    "~15–20 hours/week",
    "Comfortable overlapping US/EU time zones",
  ],

  links: {
    github: "https://github.com/ItipatS",
    roblox: "https://www.roblox.com/users/94439374/profile",
    cv: "https://drive.google.com/file/d/1UsJg4483w0TwDLKzzeAKLkIs6HY3Ac-k/view?usp=sharing",
  },
};