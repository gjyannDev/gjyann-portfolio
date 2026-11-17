# Graph Report - gjyann-portfolio  (2026-11-17)

## Corpus Check
- 21 files · ~1,276 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 133 nodes · 163 edges · 14 communities (9 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe0ac44f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- compilerOptions
- components.json
- layout.tsx
- dependencies
- devDependencies
- Hero
- tailwind
- scripts
- README.md
- AGENTS.md
- app_globals
- lib_utils_cn

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Container()` - 8 edges
3. `tailwind` - 6 edges
4. `aliases` - 6 edges
5. `scripts` - 5 edges
6. `next` - 5 edges
7. `Footer()` - 5 edges
8. `Header()` - 5 edges
9. `Hero()` - 5 edges
10. `SiteConfig` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `Hero()`  [EXTRACTED]
  src/app/page.tsx → src/components/sections/hero.tsx
- `Hero()` --calls--> `Container()`  [EXTRACTED]
  src/components/sections/hero.tsx → src/components/layout/container.tsx
- `RootLayout()` --calls--> `Footer()`  [EXTRACTED]
  src/app/layout.tsx → src/components/layout/footer.tsx
- `RootLayout()` --calls--> `Header()`  [EXTRACTED]
  src/app/layout.tsx → src/components/layout/header.tsx
- `Footer()` --calls--> `Container()`  [EXTRACTED]
  src/components/layout/footer.tsx → src/components/layout/container.tsx

## Import Cycles
- None detected.

## Communities (14 total, 5 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (22): eslintConfig, name, private, version, class-variance-authority, cn, eslint, eslint-config-next (+14 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 3 - "components.json"
Cohesion: 0.12
Nodes (15): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+7 more)

### Community 4 - "layout.tsx"
Cohesion: 0.21
Nodes (12): nextConfig, next, src_app_globals, metadata, RootLayout(), Container(), Footer(), Header() (+4 more)

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
- **77 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+72 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 88 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `layout.tsx` to `package.json`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _77 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09230769230769231 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._