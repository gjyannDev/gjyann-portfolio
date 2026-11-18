# Graph Report - gjyann-portfolio  (2026-11-18)

## Corpus Check
- 52 files · ~16,305 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 246 nodes · 435 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `29bd0fa5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- compilerOptions
- about.tsx
- components.json
- experience.tsx
- dependencies
- devDependencies
- reveal.tsx
- theme-toggle.tsx
- hero.tsx
- README.md
- AGENTS.md
- app_globals
- lib_utils_cn
- layout.tsx
- project-list.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `next` - 12 edges
3. `Container()` - 10 edges
4. `About()` - 10 edges
5. `Experience()` - 8 edges
6. `Projects()` - 8 edges
7. `Section()` - 8 edges
8. `Header()` - 7 edges
9. `PageIntro()` - 7 edges
10. `Chip()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `About()`  [EXTRACTED]
  src/app/about/page.tsx → src/features/home/about/about.tsx
- `ExperiencePage()` --calls--> `Experience()`  [EXTRACTED]
  src/app/experience/page.tsx → src/features/home/experience/experience.tsx
- `RootLayout()` --calls--> `Header()`  [EXTRACTED]
  src/app/layout.tsx → src/components/layout/header/header.tsx
- `RootLayout()` --calls--> `MotionProvider()`  [EXTRACTED]
  src/app/layout.tsx → src/components/motion/motion-provider.tsx
- `RootLayout()` --calls--> `ThemeProvider()`  [EXTRACTED]
  src/app/layout.tsx → src/components/theme/theme-provider.tsx

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, private, scripts, build, dev, lint, start (+13 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "about.tsx"
Cohesion: 0.14
Nodes (18): AboutPage(), metadata, About(), AboutProps, StackCard(), about, TODO: replace placeholders with real values., stack (+10 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "experience.tsx"
Cohesion: 0.25
Nodes (14): companies, Company, companySpan(), currentMonth(), formatDuration(), formatMonth(), intro, MONTHS (+6 more)

### Community 5 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, class-variance-authority, cn, lucide-react, motion, next, next-themes, @paper-design/shaders-react (+5 more)

### Community 6 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

### Community 7 - "reveal.tsx"
Cohesion: 0.19
Nodes (12): motion, NotFound(), MotionProvider(), Reveal(), RevealProps, Stagger(), StaggerProps, PageIntro() (+4 more)

### Community 8 - "theme-toggle.tsx"
Cohesion: 0.10
Nodes (17): class-variance-authority, cn, lucide-react, next-themes, radix-ui, react, Header(), isActive() (+9 more)

### Community 9 - "hero.tsx"
Cohesion: 0.20
Nodes (11): ExperiencePage(), metadata, Home(), metadata, ProjectsPage(), Experience(), Avatar(), Hero() (+3 more)

### Community 10 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 14 - "layout.tsx"
Cohesion: 0.14
Nodes (15): nextConfig, next, src_app_globals, metadata, RootLayout(), Background(), Container(), Footer() (+7 more)

### Community 15 - "project-list.tsx"
Cohesion: 0.22
Nodes (13): intro, Project, PROJECT_TYPES, projects, ProjectType, TODO: replace placeholders with real projects., Badge(), Filter (+5 more)

## Knowledge Gaps
- **95 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+90 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 110 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `layout.tsx` to `package.json`, `about.tsx`, `reveal.tsx`, `theme-toggle.tsx`, `hero.tsx`, `project-list.tsx`?**
  _High betweenness centrality (0.192) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `react` connect `theme-toggle.tsx` to `package.json`, `about.tsx`, `project-list.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _95 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `about.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14245014245014245 - nodes in this community are weakly interconnected._