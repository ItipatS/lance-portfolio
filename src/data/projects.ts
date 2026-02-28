export type ProjectCategory = "Roblox" | "Unity" | "Tooling";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;

  pitch: string;
  summary: string;

  technicalHighlights: string[];
  metrics?: string[];

  youtubeIds?: string[];
  links: ProjectLink[];

  isPrivate?: boolean;
};

export const projects: Project[] = [  
  {
    id: "jecs-dust-field",
    title: "Server-Authoritative ECS Simulation – 1,500+ Entities",
    category: "Roblox",

    pitch:
      "Deterministic data-oriented simulation streamed over custom Blink networking with delta + snapshot replication.",

    summary:
      "A pure ECS server simulation with no server Instances. 1,500+ entities are simulated at a fixed tick and streamed via batched deltas and periodic snapshots. Clients reconstruct a mirrored ECS world for rendering and effects, fully decoupled from simulation tick.",

    youtubeIds: ["ooikRRlfHRs"],

    links: [
      { label: "Play Demo", href: "https://www.roblox.com/games/129984384759966/Server-Simulation" },
      { label: "Watch Demo", href: "https://youtu.be/ooikRRlfHRs" },
      { label: "GitHub", href: "https://github.com/ItipatS/Roblox-Server-Simulation" },
    ],

    metrics: [
      "1,500+ live entities",
      "~200 KB/s client net intake",
      "Simulation 20 Hz • Network 12 Hz • Effects 60 Hz",
    ],

    technicalHighlights: [
      "Pure JECS server world (data-only, no physics Instances)",
      "Hybrid networking: bulk spawn + transform deltas + periodic full snapshots",
      "Mailbox batching pattern (PendingMovements / PendingStates)",
      "Join-in-progress reconstruction via full snapshot sync",
      "Client ECS mirror fully decoupled from simulation tick",
      "Explicit tick scheduling to prevent frame-dependent drift",
    ],
  },
  {
    id: "jecs-rpg-template",
    title: "Deterministic Mob Simulation – 150 Server-Driven Entities",
    category: "Roblox",

    pitch:
      "Server-authoritative AI with explicit tick separation and minimal engine-native replication.",

    summary:
      "An ECS-driven server simulation validating scalable AI, raycast-based movement, and decoupled replication. AI, movement, and sync are explicitly separated across ticks to maintain stability under load while clients interpolate at 60 FPS.",

    youtubeIds: ["eprIcdV42WM"],

    links: [
      { label: "Play Demo", href: "https://www.roblox.com/games/104444037041931/RPGJECS-DEMO" },
      { label: "Watch Demo", href: "https://youtu.be/eprIcdV42WM" },
      { label: "GitHub", href: "https://github.com/ItipatS/RPGJECS" },
    ],

    metrics: [
      "~150 active mobs",
      "~80 KB/s net intake",
      "AI 8 Hz • Simulation 20 Hz • Render 60 Hz",
    ],

    technicalHighlights: [
      "ECS components: Transform, Traits, Locomotion, AIState, Hitbox",
      "Strict system ordering: AI → Movement → Sync → Interpolation",
      "Server replicates minimal hitbox transforms (no RemoteEvent spam)",
      "Client-side interpolation fully decoupled from simulation tick",
      "Raycast-based ground snapping to avoid per-entity physics overhead",
      "Pre-baked navigation nodes could further reduce per-tick raycasts",
    ],
  },



  {
    id: "unity-arena-fighter",
    title: "3D Arena Fighting Game (Unity)",
    category: "Unity",
    pitch:
      "A Smash/Brawlhalla-inspired arena fighter prototype focused on modular gameplay systems and polished UI flow.",
    summary:
      "Built entirely in Unity with component-based modules for movement/physics/stats/combat, plus a scene-aware UI system and responsive input buffering for fighting-game feel.",
    youtubeIds: ["NoEU0BiMYJQ", "6s0k-Z0F8c8"],
    links: [
      { label: "Play (itch.io)", href: "https://itipats.itch.io/holo-arena" },
      { label: "Watch Demo", href: "https://youtu.be/NoEU0BiMYJQ" },
      { label: "UI Demo", href: "https://youtu.be/6s0k-Z0F8c8" },
      { label: "GitHub", href: "https://github.com/ItipatS/HoloArena" },
    ],
    technicalHighlights: [
      "Modular, inspector-friendly architecture (movement, gravity, ground check, stats, combat)",
      "Input buffering + input windows for frame-precise actions",
      "Scene-aware UI managers with animator-driven button feedback",
      "Shader/VFX-driven feedback to reduce reliance on traditional UI bars",
    ],
  },

  {
    id: "voxlcoding-mini-language",
    title: "VoxlCoding – In-Game Mini Programming Language (Roblox)",
    category: "Tooling",
    pitch: "An in-game coding sandbox: write simple rules and instantly generate a 3D block structure.",
    summary:
      "A rapid prototype: a tokenizer/parser/compiler pipeline inside Roblox, syntax highlighting, error feedback, and real-time preview rendering.",
    youtubeIds: ["CMWizPhxsQc", "dzdsKzTBOmY"],
    links: [
      { label: "Play", href: "https://www.roblox.com/games/119162488544766" },
      { label: "Watch Demo 1", href: "https://youtu.be/CMWizPhxsQc" },
      { label: "Watch Demo 2", href: "https://youtu.be/dzdsKzTBOmY" },
    ],
    technicalHighlights: [
      "Tokenizer → recursive descent parser → AST → expand/compile into eval(x,y,z)",
      "Syntax highlight overlay + error reporting",
      "Debounced rebuild loop to avoid recompute every keystroke",
      "Preview renderer uses pooled parts and updates visibility/color efficiently",
      "AI-assisted implementation accelerated scaffolding; design/integration owned end-to-end",
    ],
  },
  
  {
    id: "voxl-terra",
    title: "Voxl Terra – Procedural Voxel World Streaming (Private)",
    category: "Roblox",
    pitch:
    "Procedural voxel world with server-driven chunk streaming and client-side greedy meshing.",
    summary:
    "Server generates and caches chunk data, streams region-based updates per player, and enforces authority over world state. Clients perform greedy meshing with frame-budgeted build queues and pooled rendering to maintain stable performance.",
    youtubeIds: ["6OcOnGqwPhM"],
    links: [{ label: "Watch Demo", href: "https://youtu.be/6OcOnGqwPhM" }],
    isPrivate: true,
    technicalHighlights: [
      "Server-wide chunk cache + per-player region streaming (radius + shift threshold)",
      "Join-boost streaming mode (fast batches early, normal batches after)",
      "Client world stores sparse voxel data + heightfields; builds meshes via greedy face merging",
      "Mesh queue with frame budget + part pooling + unload/recycle to control memory/CPU",
      "Biome shaping via multi-frequency noise + cave carving via 3D noise threshold",
    ],
  },

  {
    id: "data-bound-ui-framework",
    title: "Roblox Custom UI Framework – Inventory, Tooltips, Transitions",
    category: "Roblox",
    pitch: "A modular UI framework with clean state management, inventory sync, and dynamic tooltips.",
    summary:
      "Designed for maintainability: centralized UI manager, tween orchestration, lifecycle cleanup, and data-bound UI patterns backed by persistent storage.",
    youtubeIds: ["0NLv2Lb7Fcc"],
    links: [
      { label: "Play Demo", href: "https://www.roblox.com/games/112639746648812/Data-Bound-UI-with-Datastore" },
      { label: "Watch Demo", href: "https://youtu.be/0NLv2Lb7Fcc" },
      { label: "GitHub", href: "https://github.com/ItipatS/Roblox-Data-Bound-UI-with-Datastore" },
    ],
    technicalHighlights: [
      "UIManager: caches GUI refs, tracks open/close states, supports composite UI groups",
      "TweenManager centralizes transitions and prevents overlapping tweens",
      "InventoryManager syncs inventory state to UI; TooltipBuilder generates hover tooltips from metadata",
      "Cleanup lifecycle to prevent memory leaks (Maid-like patterns)",
      "ProfileService-backed persistence on server",
    ],
  },

];