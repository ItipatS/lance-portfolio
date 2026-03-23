import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";

const DISCORD_UID = "443066299078279178";

// ── Fill in your YouTube Channel ID ──────────────────────────────────
// YouTube Studio → Settings → Channel → Advanced settings → Channel ID
const YOUTUBE_CHANNEL_ID = "";
// ─────────────────────────────────────────────────────────────────────

type SpotifyData = {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: { start: number; end: number };
};

type LanyardData = {
  discord_user: { username: string; avatar: string | null; id: string };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: { name: string; details?: string }[];
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
};

type YTVideo = { title: string; videoId: string; link: string; pubDate: string };

const statusColor: Record<string, string> = {
  online: "bg-green-400", idle: "bg-yellow-400",
  dnd: "bg-red-500",      offline: "bg-zinc-500",
};
const statusLabel: Record<string, string> = {
  online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline",
};

// ── Helpers ───────────────────────────────────────────────────────────

function relativeDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return "today";
  if (d === 1) return "yesterday";
  if (d < 30)  return `${d} days ago`;
  const m = Math.floor(d / 30);
  return m === 1 ? "1 month ago" : `${m} months ago`;
}

// ── Spotify sub-components ────────────────────────────────────────────

function EqBars() {
  return (
    <div className="flex items-end gap-px" style={{ height: 14 }}>
      {[0, 0.2, 0.4, 0.15].map((delay, i) => (
        <div
          key={i}
          className="eq-bar w-[3px] rounded-full bg-green-400"
          style={{ height: 14, animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}

function SpotifyProgress({ start, end }: { start: number; end: number }) {
  const [elapsed, setElapsed] = useState(() => Date.now() - start);
  const duration = end - start;

  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - start), 1000);
    return () => clearInterval(id);
  }, [start]);

  const fmt = (ms: number) => {
    const s = Math.floor(Math.max(0, ms) / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const pct = Math.min(100, Math.max(0, (elapsed / duration) * 100));

  return (
    <div className="mt-2 px-4 pb-4">
      <div className="h-1 rounded-full bg-zinc-700/60">
        <div className="h-1 rounded-full bg-green-400" style={{ width: `${pct}%`, transition: "width 1s linear" }} />
      </div>
      <div className="mt-1 flex justify-between text-[10px] tabular-nums text-zinc-500">
        <span>{fmt(elapsed)}</span>
        <span>{fmt(duration)}</span>
      </div>
    </div>
  );
}

// ── Expand wrapper (grid 0fr → 1fr) ──────────────────────────────────

function ExpandPanel({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div style={{ overflow: "hidden" }}>{children}</div>
    </div>
  );
}

// ── Discord card ──────────────────────────────────────────────────────

function DiscordCard() {
  const [data, setData]     = useState<LanyardData | null>(null);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_UID}`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setData(json.data); else setFailed(true); })
      .catch(() => setFailed(true));
  }, []);

  const avatarUrl = data?.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${DISCORD_UID}/${data.discord_user.avatar}.png?size=64`
    : `https://cdn.discordapp.com/embed/avatars/0.png`;

  const nonSpotifyActivity = data?.activities.find(
    (a) => a.name !== "Custom Status" && a.name !== "Spotify"
  );
  const isPlaying = !!(data?.listening_to_spotify && data?.spotify);
  const sp = data?.spotify;

  return (
    <div
      className="card-border-discord rounded-2xl p-px"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden rounded-2xl bg-zinc-900/95 transition-colors duration-200 hover:bg-zinc-900/80">
        {/* Main row */}
        <a
          href={`https://discord.com/users/${DISCORD_UID}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 px-5 py-4"
        >
          <div className="relative shrink-0">
            <img src={avatarUrl} alt="avatar" className="h-12 w-12 rounded-full border border-zinc-700" />
            {!failed && data && (
              <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-zinc-900 ${statusColor[data.discord_status]}`} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-indigo-400">
                <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="truncate text-sm font-semibold text-zinc-100">
                {failed || !data ? "mirukunoneko" : data.discord_user.username}
              </span>
              {isPlaying && <EqBars />}
            </div>
            <p className="mt-0.5 text-xs text-zinc-400">
              {isPlaying ? "Listening to Spotify" : (failed || !data ? "Discord" : statusLabel[data.discord_status])}
            </p>
            {nonSpotifyActivity && !isPlaying && (
              <p className="mt-0.5 truncate text-xs text-zinc-500">
                {nonSpotifyActivity.name}{nonSpotifyActivity.details ? ` · ${nonSpotifyActivity.details}` : ""}
              </p>
            )}
          </div>
          <span className="text-zinc-600 transition group-hover:text-zinc-300">↗</span>
        </a>

        {/* Spotify panel */}
        <ExpandPanel open={hovered && isPlaying && !!sp}>
          {sp && (
            <div className="border-t border-zinc-800/80 px-4 pt-3">
              <div className="flex gap-3">
                <img
                  src={sp.album_art_url}
                  alt={sp.album}
                  className="h-14 w-14 shrink-0 rounded-lg border border-zinc-700 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white leading-tight">{sp.song}</p>
                  <p className="mt-0.5 truncate text-xs text-zinc-400">{sp.artist}</p>
                  <p className="mt-0.5 truncate text-xs text-zinc-600">{sp.album}</p>
                </div>
              </div>
              <SpotifyProgress start={sp.timestamps.start} end={sp.timestamps.end} />
            </div>
          )}
        </ExpandPanel>
      </div>
    </div>
  );
}

// ── YouTube card ──────────────────────────────────────────────────────

// Fallback: latest video from projects data
const fallbackVideos = projects
  .flatMap((p) => (p.youtubeIds ?? []).map((id) => ({ title: p.title, videoId: id, link: `https://youtu.be/${id}`, pubDate: "" })))
  .slice(0, 1);

function YouTubeCard() {
  const [video, setVideo]   = useState<YTVideo | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!YOUTUBE_CHANNEL_ID) {
      const raf = requestAnimationFrame(() => setVideo(fallbackVideos[0] ?? null));
      return () => cancelAnimationFrame(raf);
    }
    const rss = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`);
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rss}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.status === "ok" && json.items?.length) {
          const item = json.items[0];
          const videoId = new URL(item.link).searchParams.get("v") ?? "";
          setVideo({ title: item.title, videoId, link: item.link, pubDate: item.pubDate });
        } else {
          setVideo(fallbackVideos[0] ?? null);
        }
      })
      .catch(() => setVideo(fallbackVideos[0] ?? null));
  }, []);

  const thumb = video ? `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg` : null;

  return (
    <div
      className="card-border-youtube rounded-2xl p-px"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden rounded-2xl bg-zinc-900/95 transition-colors duration-200 hover:bg-zinc-900/80">
        {/* Main row */}
        <a
          href="https://www.youtube.com/@mirukunoneko1375"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 px-5 py-4"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-100">mirukunoneko</p>
            <p className="mt-0.5 text-xs text-zinc-400">YouTube</p>
          </div>
          <span className="text-zinc-600 transition group-hover:text-zinc-300">↗</span>
        </a>

        {/* Latest video panel */}
        <ExpandPanel open={hovered && !!video}>
          {video && thumb && (
            <a
              href={video.link}
              target="_blank"
              rel="noreferrer"
              className="block border-t border-zinc-800/80 px-4 pb-4 pt-3 hover:bg-zinc-800/30 transition-colors"
            >
              <div className="relative overflow-hidden rounded-lg border border-zinc-800">
                <img
                  src={thumb}
                  alt={video.title}
                  className="w-full object-cover"
                  style={{ aspectRatio: "16/9" }}
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/90">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-xs font-medium leading-snug text-zinc-200">{video.title}</p>
              {video.pubDate && (
                <p className="mt-0.5 text-[10px] text-zinc-500">{relativeDate(video.pubDate)}</p>
              )}
            </a>
          )}
        </ExpandPanel>
      </div>
    </div>
  );
}

// ── Email card (unchanged) ────────────────────────────────────────────

function EmailCard() {
  return (
    <div className="card-border-email rounded-2xl p-px">
      <a
        href="mailto:itipat.dev@gmail.com"
        className="group flex items-center gap-4 rounded-2xl bg-zinc-900/95 px-5 py-4 transition hover:bg-zinc-900/80"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-zinc-100">itipat.dev@gmail.com</p>
          <p className="mt-0.5 text-xs text-zinc-400">Email</p>
        </div>
        <span className="text-zinc-600 transition group-hover:text-zinc-300">↗</span>
      </a>
    </div>
  );
}

// ── SocialCards (floating logic unchanged) ────────────────────────────

export function SocialCards() {
  const sentinelRef                     = useRef<HTMLDivElement>(null);
  const [isFloating,   setIsFloating]   = useState(false);
  const [showFloat,    setShowFloat]    = useState(false);
  const [floatVisible, setFloatVisible] = useState(false);
  const [isOpen,       setIsOpen]       = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
        setIsOpen(false);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isFloating) {
      let raf2: number;
      const raf1 = requestAnimationFrame(() => {
        setShowFloat(true);
        raf2 = requestAnimationFrame(() => setFloatVisible(true));
      });
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
    } else {
      const raf = requestAnimationFrame(() => setFloatVisible(false));
      const t   = setTimeout(() => setShowFloat(false), 300);
      return () => { cancelAnimationFrame(raf); clearTimeout(t); };
    }
  }, [isFloating]);

  const cards = (
    <>
      <DiscordCard />
      <YouTubeCard />
      <EmailCard />
    </>
  );

  return (
    <>
      {/* Inline */}
      <div
        ref={sentinelRef}
        className={`flex flex-col gap-3 lg:w-100 lg:shrink-0 transition-opacity duration-300 ${
          isFloating ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <p className="contact-label font-mono text-xl font-semibold uppercase tracking-[0.2em]">
          ⟡ Contact
        </p>
        {cards}
      </div>

      {/* Floating */}
      {showFloat && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          style={{
            opacity:   floatVisible ? 1 : 0,
            transform: floatVisible ? "scale(1) translateY(0)" : "scale(0.75) translateY(12px)",
            transition: floatVisible
              ? "opacity 0.3s cubic-bezier(0.34,1.56,0.64,1), transform 0.3s cubic-bezier(0.34,1.56,0.64,1)"
              : "opacity 0.25s ease-in, transform 0.25s ease-in",
          }}
        >
          {isOpen && (
            <div className="panel-enter flex w-88 flex-col gap-3">{cards}</div>
          )}
          <div className="card-border-contact overflow-hidden rounded-full p-px">
            <button
              onClick={() => setIsOpen((o) => !o)}
              className="contact-label rounded-full bg-zinc-900/95 px-5 py-2.5 font-mono text-sm font-semibold uppercase tracking-[0.2em] backdrop-blur transition hover:bg-zinc-900/80"
            >
              ⟡ Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
}
