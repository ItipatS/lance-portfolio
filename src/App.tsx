import { useMemo, useState } from "react";
import { projects, type ProjectCategory } from "./data/projects";
import { profile } from "./data/profile";
import { ProjectCard } from "./components/ProjectCard";
import { SocialCards } from "./components/SocialCards";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function LargeGitBtn({ href }: { href: string}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        mt-5
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-6
        py-3
        text-sm
        font-medium
        text-zinc-100
        relative
        transition-all
        duration-300
        group
      "
    >
      {/* Gradient Border Layer */}
      <span
        className="
          absolute
          inset-0
          rounded-xl
          p-px
          bg-linear-to-r
          from-amber-900
          via-fuchsia-500
          to-cyan-500
          opacity-70
          group-hover:opacity-100
          transition
          
        "
      >
        <span className="block h-full w-full rounded-xl bg-zinc-900" />
      </span>

      {/* Content */}
      <span className="relative flex items-center gap-2">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="opacity-90"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0C17 4.75 18 5.07 18 5.07c.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>

        GitHub
        <span className="opacity-70">↗</span>
      </span>
    </a>
  );
}

function LargeBtn({ href, label }: { href: string ; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        mt-5
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-6
        py-3
        text-sm
        font-medium
        text-zinc-100
        relative
        transition-all
        duration-300
        group
      "
    >
      {/* Gradient Border Layer */}
      <span
        className="
          absolute
          inset-0
          rounded-xl
          p-px
          bg-linear-to-r
          from-lime-300
          via-emerald-500
          to-cyan-500
          opacity-70
          group-hover:opacity-100
          transition
          
        "
      >
        <span className="block h-full w-full rounded-xl bg-zinc-900" />
      </span>

      {/* Content */}
      <span className="relative flex items-center gap-2">

        {label}
        <span className="opacity-70">↗</span>
      </span>
    </a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
      {children}
    </h2>
  );
}

const categoryStyle: Record<string, { active: string; idle: string }> = {
  All:            { active: "border-zinc-500 bg-zinc-800/60 text-zinc-100",        idle: "border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-600" },
  Roblox:         { active: "border-red-500/70 bg-red-950/50 text-red-300",        idle: "border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-red-700/50 hover:text-red-400" },
  Unity:          { active: "border-sky-500/70 bg-sky-950/50 text-sky-300",        idle: "border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-sky-700/50 hover:text-sky-400" },
  Tooling:        { active: "border-amber-500/70 bg-amber-950/50 text-amber-300",  idle: "border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-amber-700/50 hover:text-amber-400" },
  Frontend:       { active: "border-cyan-500/70 bg-cyan-950/50 text-cyan-300",     idle: "border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-cyan-700/50 hover:text-cyan-400" },
  "Bedrock Addon":{ active: "border-lime-500/70 bg-lime-950/50 text-lime-300",     idle: "border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-lime-700/50 hover:text-lime-400" },
};

const categoryIcon: Record<string, React.ReactNode> = {
  All: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  Roblox: (
    // gamepad
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 4H7a5 5 0 0 0-5 5v2l1 6a3 3 0 0 0 3 2h2l1-2h6l1 2h2a3 3 0 0 0 3-2l1-6V9a5 5 0 0 0-5-5zM9 13H7v-2h2V9h2v2h2v2h-2v2H9v-2zm7 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.5-3.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
    </svg>
  ),
  Unity: (
    // hexagonal prism / unity-ish cube
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.5 6.5 3.25L12 11 5.5 7.75 12 4.5zM4 9.1l7 3.5v7L4 16.1V9.1zm9 10.4v-7l7-3.5v7l-7 3.5z"/>
    </svg>
  ),
  Tooling: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Frontend: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  "Bedrock Addon": (
    // isometric block (Minecraft vibe)
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 2 7.5V12l10 5.5L22 12V7.5L12 2zm0 2.5 6.5 3.25L12 11 5.5 7.75 12 4.5zM3.5 9l7 3.5v5.5l-7-3.5V9zm9 9v-5.5l7-3.5v5.5L12.5 18z" opacity=".85"/>
      <rect x="10" y="3" width="4" height="4" rx=".5" transform="rotate(-20 12 5)" opacity=".4"/>
    </svg>
  ),
};

function PillButton({
  active,
  category,
  onClick,
  children,
}: {
  active: boolean;
  category: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const style = categoryStyle[category] ?? categoryStyle["All"];
  const icon  = categoryIcon[category];
  return (
    <button
      onClick={onClick}
      className={[
        "group relative overflow-visible rounded-full border px-4 py-1.5 text-xs transition",
        active ? style.active : style.idle,
      ].join(" ")}
    >
      {/* Icon: lives inside button as faint watermark, jumps out on hover */}
      {icon && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className="opacity-[.12] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-80 group-hover:-translate-y-9 group-hover:scale-[1.45] group-hover:drop-shadow-[0_0_8px_currentColor]"
            style={{ display: "flex" }}
          >
            {icon}
          </span>
        </span>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function MetricPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-200">
      {children}
    </span>
  );
}

export default function App() {
  useSmoothScroll(0.06);
  const [filter,        setFilter]        = useState<ProjectCategory | "All">("All");
  const [displayFilter, setDisplayFilter] = useState<ProjectCategory | "All">("All");
  const [isOut,         setIsOut]         = useState(false);
  const [animKey,       setAnimKey]       = useState(0);

  const displayed = useMemo(() => {
    if (displayFilter === "All") return projects;
    return projects.filter((p) => p.category === displayFilter);
  }, [displayFilter]);

  function handleFilter(cat: ProjectCategory | "All") {
    if (cat === filter) return;
    setFilter(cat);
    setIsOut(true);
    setTimeout(() => {
      setDisplayFilter(cat);
      setIsOut(false);
      setAnimKey((k) => k + 1);
    }, 160);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-72 w-xl -translate-x-1/2 rounded-full bg-linear-to-r from-indigo-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl" />
      </div>

      <div className="px-20 py-10">
        {/* Header */}
        <header className="relative flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left: bio */}
          <div className="flex-1 space-y-4">
            <p className="text-sm text-zinc-400">Portfolio / Resume</p>
            <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
            <p className="text-zinc-200">{profile.headline}</p>
            <p className="max-w-3xl text-sm leading-6 text-zinc-300">
              {profile.summary}
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.metrics.map((m) => (
                  <MetricPill key={m}>{m}</MetricPill>
                ))}
              </div>
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-2">
              {profile.links.github && <LargeGitBtn href={profile.links.github} />}
              {profile.links.roblox && <LargeBtn href={profile.links.roblox} label="Roblox" />}
              {profile.links.cv && <LargeBtn href={profile.links.cv} label="CV (PDF)" />}
            </div>
          </div>

          {/* Right: social cards */}
          <SocialCards />
        </header>

        <div className="mt-10 grid gap-10">
          {/* Strengths */}
          <section>
            <SectionTitle>What I do best</SectionTitle>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-300">
              {profile.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle>Featured projects</SectionTitle>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {(["All", "Roblox", "Unity", "Tooling", "Frontend", "Bedrock Addon"] as const).map((cat) => (
                  <PillButton
                    key={cat}
                    category={cat}
                    active={filter === cat}
                    onClick={() => handleFilter(cat)}
                  >
                    {cat}
                  </PillButton>
                ))}
              </div>
            </div>

            {/* fade-out wrapper → staggered card-in on new content */}
            <div className={`transition-all duration-150 ${isOut ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
              <div key={animKey} className="mt-4 grid gap-4">
                {displayed.map((p, i) => (
                  <div key={p.id} className="card-in" style={{ animationDelay: `${i * 0.07}s` }}>
                    <ProjectCard p={p} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Availability */}
          <section>
            <SectionTitle>Availability</SectionTitle>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-300">
              {profile.availability.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>

          <footer className="border-t border-zinc-900 pt-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} {profile.name} • React + Tailwind •
            GitHub Pages
          </footer>
        </div>
      </div>
    </div>
  );
}
