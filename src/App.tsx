import { useMemo, useState } from "react";
import { projects, type ProjectCategory } from "./data/projects";
import { profile } from "./data/profile";
import { ProjectCard } from "./components/ProjectCard";

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

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1 text-xs transition",
        active
          ? "border-zinc-500 bg-zinc-800/60 text-zinc-100"
          : "border-zinc-800 bg-zinc-900/30 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900/60",
      ].join(" ")}
    >
      {children}
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
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-72 w-xl -translate-x-1/2 rounded-full bg-linear-to-r from-indigo-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl" />
      </div>

      <div className="px-20 py-10">
        {/* Header */}
        <header className="relative space-y-4">
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
                <PillButton
                  active={filter === "All"}
                  onClick={() => setFilter("All")}
                >
                  All
                </PillButton>
                <PillButton
                  active={filter === "Roblox"}
                  onClick={() => setFilter("Roblox")}
                >
                  Roblox
                </PillButton>
                <PillButton
                  active={filter === "Unity"}
                  onClick={() => setFilter("Unity")}
                >
                  Unity
                </PillButton>
                <PillButton
                  active={filter === "Tooling"}
                  onClick={() => setFilter("Tooling")}
                >
                  Tooling
                </PillButton>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          </section>

          {/* Stack */}
          <section>
            <SectionTitle>Tooling & stack</SectionTitle>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-200"
                >
                  {t}
                </span>
              ))}
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
