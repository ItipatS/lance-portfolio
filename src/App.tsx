import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-3xl px-5 py-10">{children}</div>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-200">
      {children}
    </span>
  );
}

function LinkPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-sm text-zinc-200 hover:border-zinc-600 hover:bg-zinc-900/70 transition"
    >
      {label}
      <span className="text-zinc-500">↗</span>
    </a>
  );
}

function Card({
  title,
  desc,
  links,
}: {
  title: string;
  desc: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900/50">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium text-zinc-100">{title}</div>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{desc}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((l) => (
          <LinkPill key={l.href} href={l.href} label={l.label} />
        ))}
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      className="py-10"
    >
      <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
        {title}
      </h2>
      <div className="mt-4 text-sm leading-6 text-zinc-300">{children}</div>
    </motion.section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="relative"
        >
          {/* HERO */}
          <motion.header variants={fadeUp} className="space-y-4">
            <p className="text-sm text-zinc-400">Portfolio</p>
            <h1 className="text-3xl font-bold tracking-tight">Lance</h1>
            <p className="text-zinc-300">
              Roblox systems-focused gameplay engineer. I focus on stabilizing core systems,
              improving maintainability, and supporting long-term development with live-service constraints in mind.
            </p>

            <div className="flex flex-wrap gap-2">
              <Chip>Server-authoritative</Chip>
              <Chip>Data-driven</Chip>
              <Chip>ECS / Simulation</Chip>
              <Chip>Typed Luau</Chip>
              <Chip>Replication budgets</Chip>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <LinkPill href="#projects" label="Projects" />
              <LinkPill href="#demos" label="Demos" />
              <LinkPill href="#stack" label="Tooling" />
              <LinkPill href="#availability" label="Availability" />
            </div>
          </motion.header>

          <Section id="main" title="What I do best">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Owning core systems and technical foundations, building architecture that lets multiple developers contribute safely over time.
              </li>
              <li>
                Preventative production mindset: defensive validation, idempotent ops, edge-case simulation, and controlled rollouts.
              </li>
              <li>
                Clean authority boundaries and lifecycle handling (init → active → cleanup) so new mechanics don’t destabilize existing behavior.
              </li>
            </ul>
          </Section>

          <Section id="projects" title="Featured projects">
            <div className="space-y-3">
              <Card
                title="RPGJECS — ECS backend (200+ entities)"
                desc="Deterministic server control with extensible, debuggable systems and measured replication budgets (≈80–200 KB/s)."
                links={[{ href: "https://github.com/ItipatS/RPGJECS", label: "GitHub" }]}
              />
              <Card
                title="Roblox Server Simulation — 1500 entities"
                desc="Deterministic simulation at scale with measured replication budget (≈400 KB/s) and load-aware structure."
                links={[{ href: "https://github.com/ItipatS/Roblox-Server-Simulation", label: "GitHub" }]}
              />
              <Card
                title="UI + DataStore integration"
                desc="Data-bound UI patterns + persistence flows designed for maintainability and iteration safety."
                links={[{ href: "https://github.com/ItipatS/Roblox-Data-Bound-UI-with-Datastore", label: "GitHub" }]}
              />
            </div>
          </Section>

          <Section id="demos" title="Demos & games">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <LinkPill href="https://www.roblox.com/games/119162488544766" label="VoxlCoding (game)" />
                <LinkPill href="https://www.roblox.com/games/131785365792818/Arcane-Academy" label="Arcane Academy (contribution)" />
                <LinkPill href="https://www.roblox.com/users/94439374/profile" label="Roblox profile" />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Card
                  title="VoxlCoding demo"
                  desc="Gameplay/system demo video."
                  links={[{ href: "https://youtu.be/CMWizPhxsQc", label: "YouTube" }]}
                />
                <Card
                  title="UI + DataStore demo"
                  desc="Data binding + persistence demo video."
                  links={[{ href: "https://youtu.be/0NLv2Lb7Fcc", label: "YouTube" }]}
                />
                <Card
                  title="Custom World Generation"
                  desc="World gen demo video."
                  links={[{ href: "https://youtu.be/6OcOnGqwPhM", label: "YouTube" }]}
                />
                <Card
                  title="MagicSpell Keybinds & Buttonbinds"
                  desc="Input + ability binding demo video."
                  links={[{ href: "https://youtu.be/3mHoCtLiB9I", label: "YouTube" }]}
                />
              </div>
            </div>
          </Section>

          <Section id="stack" title="Tooling & stack">
            <p>
              Rojo, Git/GitHub, VSCode • Typed Luau • Knit, Nevermore, Wally, Lune • ECS (JECS), Blink, service-based architectures
            </p>
          </Section>

          <Section id="availability" title="Availability">
            <ul className="list-disc space-y-2 pl-5">
              <li>~15–20 hours per week</li>
              <li>Able to overlap with US/EU hours for coordination and reviews</li>
            </ul>
          </Section>

          <motion.footer variants={fadeUp} className="mt-10 border-t border-zinc-900 pt-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} Lance • React + Tailwind • Hosted on GitHub Pages
          </motion.footer>
        </motion.div>
      </Container>
    </div>
  );
}