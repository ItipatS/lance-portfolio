const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="py-10">
    <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    <div className="mt-4 text-sm leading-6 text-zinc-300">{children}</div>
  </section>
);

const Link = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    className="text-zinc-100 underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-300"
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    {children}
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-5 py-10">
        {/* Hero */}
        <header className="space-y-3">
          <p className="text-sm text-zinc-400">Portfolio / Resume</p>
          <h1 className="text-3xl font-bold tracking-tight">Lance</h1>
          <p className="text-zinc-300">
            Roblox systems-focused gameplay engineer. I build and stabilize core systems,
            improve maintainability, and support long-term development with designers and teams.
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
            <span className="rounded-full bg-zinc-900 px-3 py-1">Server-authoritative</span>
            <span className="rounded-full bg-zinc-900 px-3 py-1">Data-driven</span>
            <span className="rounded-full bg-zinc-900 px-3 py-1">ECS / Simulation</span>
            <span className="rounded-full bg-zinc-900 px-3 py-1">Typed Luau</span>
          </div>

          <nav className="flex gap-4 pt-2 text-sm text-zinc-300">
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#stack" className="hover:text-white">Tooling</a>
            <a href="#availability" className="hover:text-white">Availability</a>
            <a href="#links" className="hover:text-white">Links</a>
          </nav>
        </header>

        <main className="mt-10">
          <Section id="about" title="What I own best">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Owning core systems and technical foundations so multiple developers can
                contribute safely over time.
              </li>
              <li>
                Live-service mindset: defensive validation, idempotent operations, and
                simulated edge-case testing early — not after incidents.
              </li>
              <li>
                Clear lifecycle handling (init → active → cleanup) and authority boundaries.
              </li>
            </ul>
          </Section>

          <Section id="projects" title="Featured projects">
            <div className="space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="font-medium">RPGJECS — ECS backend (200+ entities)</div>
                <div className="mt-2 text-zinc-300">
                  Deterministic server control, extensible systems, measured replication budgets (≈80–200 KB/s).
                </div>
                <div className="mt-2">
                  <Link href="https://github.com/ItipatS/RPGJECS">GitHub</Link>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="font-medium">Roblox Server Simulation — 1500 entities</div>
                <div className="mt-2 text-zinc-300">
                  Deterministic server simulation with replication budget measured (≈400 KB/s).
                </div>
                <div className="mt-2">
                  <Link href="https://github.com/ItipatS/Roblox-Server-Simulation">GitHub</Link>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="font-medium">UI + DataStore integration</div>
                <div className="mt-2 text-zinc-300">
                  Data-bound UI patterns + persistence flows designed for maintainability.
                </div>
                <div className="mt-2">
                  <Link href="https://github.com/ItipatS/Roblox-Data-Bound-UI-with-Datastore">GitHub</Link>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="font-medium">Demos</div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li><Link href="https://youtu.be/CMWizPhxsQc">VoxlCoding demo</Link></li>
                  <li><Link href="https://youtu.be/0NLv2Lb7Fcc">UI + DataStore demo</Link></li>
                  <li><Link href="https://youtu.be/6OcOnGqwPhM">Custom World Generation</Link></li>
                  <li><Link href="https://youtu.be/3mHoCtLiB9I">MagicSpell Keybinds</Link></li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="stack" title="Tooling & stack">
            <p>
              Rojo, Git/GitHub, VSCode • Typed Luau • Knit, Nevermore, Wally, Lune •
              ECS (JECS), Blink, service-based architectures
            </p>
          </Section>

          <Section id="availability" title="Availability">
            <ul className="list-disc space-y-2 pl-5">
              <li>~15–20 hours per week</li>
              <li>Able to overlap with US/EU hours for coordination and reviews</li>
            </ul>
          </Section>

          <Section id="links" title="Links">
            <ul className="list-disc space-y-1 pl-5">
              <li><Link href="https://www.roblox.com/users/94439374/profile">Roblox profile</Link></li>
              <li><Link href="https://www.roblox.com/games/131785365792818/Arcane-Academy">Arcane Academy (recent contribution)</Link></li>
              <li><Link href="https://www.roblox.com/games/119162488544766">VoxlCoding (my game)</Link></li>
            </ul>
          </Section>
        </main>

        <footer className="mt-10 border-t border-zinc-900 pt-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} Lance • Built with React + Tailwind • Hosted on GitHub Pages
        </footer>
      </div>
    </div>
  );
}