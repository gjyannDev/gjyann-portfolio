# Graph Report - gjyann-portfolio  (2026-11-17)

## Corpus Check
- 21 files · ~1,273 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 131 nodes · 163 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe0ac44f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- compilerOptions
- Container
- components.json
- layout.tsx
- dependencies
- devDependencies
- tailwind
- scripts
- README.md
- AGENTS.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Container()` - 8 edges
3. `tailwind` - 6 edges
4. `aliases` - 6 edges
5. `Footer()` - 5 edges
6. `Header()` - 5 edges
7. `Hero()` - 5 edges
8. `SiteConfig` - 5 edges
9. `scripts` - 5 edges
10. `next` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `Hero()`  [EXTRACTED]
  app/page.tsx → components/sections/hero.tsx
- `RootLayout()` --calls--> `Footer()`  [EXTRACTED]
  app/layout.tsx → components/layout/footer.tsx
- `RootLayout()` --calls--> `Header()`  [EXTRACTED]
  app/layout.tsx → components/layout/header.tsx
- `Footer()` --calls--> `Container()`  [EXTRACTED]
  components/layout/footer.tsx → components/layout/container.tsx
- `Header()` --calls--> `Container()`  [EXTRACTED]
  components/layout/header.tsx → components/layout/container.tsx

## Import Cycles
- None detected.

## Communities (12 total, 2 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (22): Button(), buttonVariants, eslintConfig, name, private, version, class-variance-authority, cn (+14 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "Container"
Cohesion: 0.28
Nodes (7): RootLayout(), Home(), Container(), Footer(), Header(), Hero(), SiteConfig

### Community 3 - "components.json"
Cohesion: 0.12
Nodes (15): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+7 more)

### Community 4 - "layout.tsx"
Cohesion: 0.27
Nodes (7): app_globals, metadata, plexMono, plexSans, lib_utils_cn, nextConfig, next

### Community 5 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, class-variance-authority, cn, lucide-react, next, radix-ui, react, react-dom (+2 more)

### Community 6 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

### Community 8 - "tailwind"
Cohesion: 0.33
Nodes (6): tailwind, baseColor, config, css, cssVariables, prefix

### Community 9 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 10 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **77 isolated node(s):** `metadata`, `$schema`, `style`, `rsc`, `tsx` (+72 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 86 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `layout.tsx` to `package.json`, `Container`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `metadata`, `$schema`, `style` to the rest of the system?**
  _77 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09230769230769231 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._