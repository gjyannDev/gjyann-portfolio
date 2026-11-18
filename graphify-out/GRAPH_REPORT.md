# Graph Report - gjyann-portfolio  (2026-11-18)

## Corpus Check
- 55 files · ~16,984 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 260 nodes · 468 edges · 16 communities (13 shown, 3 thin omitted)
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
- section.tsx
- reveal.tsx
- nav-links.tsx
- github.tsx
- README.md
- AGENTS.md
- app_globals
- lib_utils_cn
- layout.tsx
- project-list.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `next` - 13 edges
3. `Container()` - 10 edges
4. `About()` - 10 edges
5. `GitHubActivity()` - 10 edges
6. `Section()` - 10 edges
7. `Experience()` - 8 edges
8. `Projects()` - 8 edges
9. `Header()` - 7 edges
10. `PageIntro()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `About()`  [EXTRACTED]
  src/app/about/page.tsx → src/features/home/about/about.tsx
- `ExperiencePage()` --calls--> `Experience()`  [EXTRACTED]
  src/app/experience/page.tsx → src/features/home/experience/experience.tsx
- `RootLayout()` --calls--> `MotionProvider()`  [EXTRACTED]
  src/app/layout.tsx → src/components/motion/motion-provider.tsx
- `NotFound()` --calls--> `PageIntro()`  [EXTRACTED]
  src/app/not-found.tsx → src/components/sections/page-intro.tsx
- `Home()` --calls--> `About()`  [EXTRACTED]
  src/app/page.tsx → src/features/home/about/about.tsx

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.06
Nodes (30): eslintConfig, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+22 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "about.tsx"
Cohesion: 0.18
Nodes (12): AboutPage(), metadata, About(), AboutProps, StackCard(), about, TODO: replace placeholders with real values., stack (+4 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "experience.tsx"
Cohesion: 0.25
Nodes (14): companies, Company, companySpan(), currentMonth(), formatDuration(), formatMonth(), intro, MONTHS (+6 more)

### Community 5 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, class-variance-authority, cn, lucide-react, motion, next, next-themes, @paper-design/shaders-react (+5 more)

### Community 6 - "section.tsx"
Cohesion: 0.17
Nodes (15): Container(), NavItem, profile, ProfileLink, TODO: replace placeholders with real values., SiteConfig, Avatar(), Hero() (+7 more)

### Community 7 - "reveal.tsx"
Cohesion: 0.18
Nodes (13): motion, NotFound(), MotionProvider(), Reveal(), RevealProps, Stagger(), StaggerProps, PageIntro() (+5 more)

### Community 8 - "nav-links.tsx"
Cohesion: 0.14
Nodes (9): class-variance-authority, cn, radix-ui, react, isActive(), NavLink(), NavLinks(), Button() (+1 more)

### Community 9 - "github.tsx"
Cohesion: 0.14
Nodes (19): ExperiencePage(), metadata, Home(), metadata, ProjectsPage(), Experience(), ContributionCalendar, ContributionDay (+11 more)

### Community 10 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 14 - "layout.tsx"
Cohesion: 0.14
Nodes (16): nextConfig, lucide-react, next, next-themes, src_app_globals, metadata, RootLayout(), Background() (+8 more)

### Community 15 - "project-list.tsx"
Cohesion: 0.22
Nodes (13): intro, Project, PROJECT_TYPES, projects, ProjectType, TODO: replace placeholders with real projects., Badge(), Filter (+5 more)

## Knowledge Gaps
- **99 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 114 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `layout.tsx` to `package.json`, `about.tsx`, `section.tsx`, `reveal.tsx`, `nav-links.tsx`, `github.tsx`, `project-list.tsx`?**
  _High betweenness centrality (0.205) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `react` connect `nav-links.tsx` to `package.json`, `about.tsx`, `layout.tsx`, `project-list.tsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._