import { useMemo } from "react";
import type { Project } from "../data/projects";
import { YouTubeThumb } from "./YouTubeThumb";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-200">
      {children}
    </span>
  );
}

function LinkBtn({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-sm text-zinc-200 hover:border-zinc-600 hover:bg-zinc-900/70 transition"
    >
      {label} <span className="text-zinc-500">↗</span>
    </a>
  );
}

function LargeGithubBtn({ href }: { href: string }) {
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
          from-indigo-500
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

        More details (GitHub)
        <span className="opacity-70">↗</span>
      </span>
    </a>
  );
}



export function ProjectCard({ p }: { p: Project }) {
  const githubLink = p.links.find((l) => l.label === "GitHub");
  const mainVideo = useMemo(() => p.youtubeIds?.[0], [p.youtubeIds]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900/50">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="sm:w-[42%]">
          {mainVideo ? (
            <a href={`https://youtu.be/${mainVideo}`} target="_blank" rel="noreferrer">
              <YouTubeThumb id={mainVideo} title={`${p.title} video thumbnail`} />
            </a>
          ) : (
            <div className="aspect-video rounded-xl border border-zinc-800 bg-zinc-950/50" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-zinc-100">{p.title}</h3>
            <Pill>{p.category}</Pill>
            {p.isPrivate ? <Pill>Private</Pill> : null}
          </div>

          <p className="mt-2 text-sm text-zinc-200">{p.pitch}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{p.summary}</p>

          {p.metrics?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {p.metrics.map((m) => (
                <Pill key={m}>{m}</Pill>
              ))}
            </div>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-2">
            {p.links.map((l) => (
              <LinkBtn key={l.href} href={l.href} label={l.label} />
            ))}
          </div>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-300">
              {p.technicalHighlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
          </ul>
          
           {githubLink && <LargeGithubBtn href={githubLink.href} />}

        </div>
      </div>
    </div>
  );
}