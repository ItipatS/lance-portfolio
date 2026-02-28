export function YouTubeThumb({ id, title }: { id: string; title: string }) {
  const url = `https://www.youtube.com/watch?v=${id}`;
  const thumb = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40"
      aria-label={`Watch video: ${title}`}
      title="Watch on YouTube"
    >
      <img
        src={thumb}
        alt={`Video thumbnail: ${title}`}
        className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100 group-hover:scale-[1.02]"
        loading="lazy"
      />

      {/* Dark gradient to help the icon pop */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

      {/* YouTube badge */}
      <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-zinc-100">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        YouTube
      </div>

      {/* Play button */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm text-white ring-1 ring-white/10 transition group-hover:bg-black/65 group-hover:ring-white/20">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="opacity-95"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="font-medium">Watch</span>
        </div>
      </div>
    </a>
  );
}