# Graph Report - gjyann-portfolio  (2026-11-18)

## Corpus Check
- 39 files · ~4,303 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 190 nodes · 303 edges · 15 communities (11 shown, 4 thin omitted)
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
- motion/index.ts
- nav-links.tsx
- hero.tsx
- README.md
- AGENTS.md
- app_globals
- lib_utils_cn
- layout/index.ts

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `PageIntro()` - 13 edges
3. `next` - 10 edges
4. `Hero()` - 9 edges
5. `Container()` - 8 edges
6. `Reveal()` - 8 edges
7. `Header()` - 7 edges
8. `Stagger()` - 7 edges
9. `tailwind` - 6 edges
10. `aliases` - 6 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `PageIntro()`  [EXTRACTED]
  src/app/about/page.tsx → src/components/sections/page-intro.tsx
- `ExperiencesPage()` --calls--> `PageIntro()`  [EXTRACTED]
  src/app/experiences/page.tsx → src/components/sections/page-intro.tsx
- `RootLayout()` --calls--> `Header()`  [EXTRACTED]
  src/app/layout.tsx → src/components/layout/header/header.tsx
- `RootLayout()` --calls--> `MotionProvider()`  [EXTRACTED]
  src/app/layout.tsx → src/components/motion/motion-provider.tsx
- `RootLayout()` --calls--> `ThemeProvider()`  [EXTRACTED]
  src/app/layout.tsx → src/components/theme/theme-provider.tsx

## Import Cycles
- None detected.

## Communities (15 total, 4 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, private, scripts, build, dev, lint, start (+13 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "layout.tsx"
Cohesion: 0.15
Nodes (14): nextConfig, next, AboutPage(), metadata, ExperiencesPage(), metadata, src_app_globals, metadata (+6 more)

### Community 5 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, class-variance-authority, cn, lucide-react, motion, next, next-themes, @paper-design/shaders-react (+5 more)

### Community 6 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

### Community 7 - "motion/index.ts"
Cohesion: 0.24
Nodes (9): motion, MotionProvider(), RevealProps, Stagger(), StaggerProps, ease, fadeUp, stagger() (+1 more)

### Community 8 - "nav-links.tsx"
Cohesion: 0.16
Nodes (15): class-variance-authority, cn, lucide-react, next-themes, radix-ui, react, Header(), isActive() (+7 more)

### Community 9 - "hero.tsx"
Cohesion: 0.19
Nodes (14): Home(), Reveal(), NavItem, profile, ProfileLink, TODO: replace placeholders with real values., SiteConfig, Avatar() (+6 more)

### Community 10 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 14 - "layout/index.ts"
Cohesion: 0.38
Nodes (5): RootLayout(), Background(), Container(), Footer(), PageIntroProps

## Knowledge Gaps
- **87 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+82 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 99 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `layout.tsx` to `package.json`, `nav-links.tsx`, `hero.tsx`?**
  _High betweenness centrality (0.194) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _87 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._