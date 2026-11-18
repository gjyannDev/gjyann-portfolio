# Graph Report - gjyann-portfolio  (2026-11-17)

## Corpus Check
- 27 files · ~1,984 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 152 nodes · 203 edges · 13 communities (9 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b874516b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- compilerOptions
- components.json
- layout.tsx
- dependencies
- devDependencies
- reveal.tsx
- scripts
- README.md
- AGENTS.md
- app_globals
- lib_utils_cn

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Container()` - 8 edges
3. `Hero()` - 7 edges
4. `tailwind` - 6 edges
5. `aliases` - 6 edges
6. `scripts` - 5 edges
7. `motion` - 5 edges
8. `next` - 5 edges
9. `RootLayout()` - 5 edges
10. `Footer()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `MotionProvider()`  [EXTRACTED]
  src/app/layout.tsx → src/components/motion/motion-provider.tsx
- `Home()` --calls--> `Hero()`  [EXTRACTED]
  src/app/page.tsx → src/components/sections/hero.tsx
- `Hero()` --calls--> `Container()`  [EXTRACTED]
  src/components/sections/hero.tsx → src/components/layout/container.tsx
- `RootLayout()` --calls--> `Background()`  [EXTRACTED]
  src/app/layout.tsx → src/components/layout/background.tsx
- `RootLayout()` --calls--> `Footer()`  [EXTRACTED]
  src/app/layout.tsx → src/components/layout/footer.tsx

## Import Cycles
- None detected.

## Communities (13 total, 4 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (22): eslintConfig, name, private, version, class-variance-authority, cn, eslint, eslint-config-next (+14 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "layout.tsx"
Cohesion: 0.20
Nodes (13): nextConfig, next, src_app_globals, metadata, RootLayout(), Background(), Container(), Footer() (+5 more)

### Community 5 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, class-variance-authority, cn, lucide-react, motion, next, @paper-design/shaders-react, radix-ui (+4 more)

### Community 6 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

### Community 7 - "reveal.tsx"
Cohesion: 0.17
Nodes (13): motion, @paper-design/shaders-react, Home(), MotionProvider(), Reveal(), RevealProps, Stagger(), StaggerProps (+5 more)

### Community 9 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 10 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **83 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+78 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 94 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `layout.tsx` to `package.json`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `motion` connect `reveal.tsx` to `package.json`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _83 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09230769230769231 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._