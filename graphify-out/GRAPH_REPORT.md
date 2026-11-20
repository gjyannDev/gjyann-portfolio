# Graph Report - gjyann-portfolio  (2026-11-20)

## Corpus Check
- 58 files · ~167,709 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 280 nodes · 519 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2d020170`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- compilerOptions
- about.tsx
- components.json
- experience.tsx
- dependencies
- moon-scene.ts
- theme-toggle.tsx
- layout.tsx
- github.tsx
- README.md
- AGENTS.md
- app_globals
- lib_utils_cn
- project-list.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `next` - 13 edges
3. `Container()` - 10 edges
4. `About()` - 10 edges
5. `GitHubActivity()` - 10 edges
6. `Section()` - 10 edges
7. `Hero()` - 9 edges
8. `react` - 8 edges
9. `MoonSky()` - 8 edges
10. `Experience()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `About()`  [EXTRACTED]
  src/app/about/page.tsx → src/features/home/about/about.tsx
- `ExperiencePage()` --calls--> `Experience()`  [EXTRACTED]
  src/app/experience/page.tsx → src/features/home/experience/experience.tsx
- `RootLayout()` --calls--> `Header()`  [EXTRACTED]
  src/app/layout.tsx → src/components/layout/header/header.tsx
- `RootLayout()` --calls--> `MoonSky()`  [EXTRACTED]
  src/app/layout.tsx → src/components/layout/moon-sky.tsx
- `RootLayout()` --calls--> `ThemeProvider()`  [EXTRACTED]
  src/app/layout.tsx → src/components/theme/theme-provider.tsx

## Import Cycles
- None detected.

## Communities (15 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.07
Nodes (29): eslintConfig, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react (+21 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "about.tsx"
Cohesion: 0.10
Nodes (26): react, AboutPage(), metadata, NavItem, profile, ProfileLink, SiteConfig, About() (+18 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "experience.tsx"
Cohesion: 0.14
Nodes (23): ExperiencePage(), metadata, Home(), companies, Company, companySpan(), currentMonth(), formatDuration() (+15 more)

### Community 5 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, class-variance-authority, cn, lucide-react, motion, next, next-themes, @paper-design/shaders-react (+5 more)

### Community 6 - "moon-scene.ts"
Cohesion: 0.22
Nodes (13): compile(), createMoonScene(), KNOWN_NEW_MOON, MARIA, moonPhase(), PHASE_NAMES, SceneFrame, SPOTS (+5 more)

### Community 7 - "theme-toggle.tsx"
Cohesion: 0.10
Nodes (16): class-variance-authority, cn, lucide-react, next-themes, radix-ui, react-dom, Header(), isActive() (+8 more)

### Community 8 - "layout.tsx"
Cohesion: 0.11
Nodes (23): nextConfig, motion, next, src_app_globals, metadata, RootLayout(), NotFound(), Background() (+15 more)

### Community 9 - "github.tsx"
Cohesion: 0.17
Nodes (15): metadata, ProjectsPage(), ContributionCalendar, ContributionDay, ContributionLevel, getContributions(), DAY_LABELS, dayTitle() (+7 more)

### Community 10 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 15 - "project-list.tsx"
Cohesion: 0.24
Nodes (12): intro, Project, PROJECT_TYPES, projects, ProjectType, Badge(), Filter, FILTERS (+4 more)

## Knowledge Gaps
- **104 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+99 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 117 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `layout.tsx` to `package.json`, `about.tsx`, `experience.tsx`, `theme-toggle.tsx`, `github.tsx`, `project-list.tsx`?**
  _High betweenness centrality (0.185) - this node is a cross-community bridge._
- **Why does `react` connect `about.tsx` to `package.json`, `project-list.tsx`, `moon-scene.ts`, `theme-toggle.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _104 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `about.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10241820768136557 - nodes in this community are weakly interconnected._