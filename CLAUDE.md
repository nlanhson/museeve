# Project Configuration

Design-agency workspace: designers use Claude Code to take apps from brief → design system → UI → code → handoff. Keep it lean; keep it slop-free.

## No-slop policy (always on)

The `no-slop` skill is a standing constraint, not an on-demand tool:
- **Generating** any UI, copy, or frontend code → apply `no-slop` rules while generating.
- **Reviewing** any design or code → `/slop-check` (or the `no-slop` checklist) is part of the review, alongside heuristics and accessibility.
- Generic AI-default output (interchangeable layouts, hype copy, boilerplate code) is treated as a defect, same severity as a broken state.

## Developer conventions (always on)

The client receives the whole repo and its history; the commit log is a deliverable. The `dev-conventions` skill is a standing constraint whenever code touches git:
- **Committing / branching / pushing** → apply `dev-conventions`; run `/commit` to do it end to end.
- **Four hard rules, no exceptions:** never push to `main` · always end a commit with `Jira: KEY-123` · never `git add -A` (stage read paths only) · never let AI sign the commit (no `Co-Authored-By: Claude`).
- **Atomic commits:** one reversible change each, `type(scope): what` + why + Jira. Bundled/unrelated changes are a defect, same as a broken state.
- **Stack choice:** "does a stranger need to find this on Google?" → Next.js (public) vs plain React/Vite (behind login) vs RN+Expo (mobile). Ask the tech lead, record it in `project/STATE.md`.

## Skills (29 active)

### Core guardrails
- **no-slop** — anti-AI-slop rules for visuals, copy, and code; includes the pre-ship slop check
- **taste** — the team's taste memory (`taste/TASTE.md` + library); consult before any visual direction

### Designer craft (8) — one dense skill per discipline
- **design-research** — interviews, personas, journey maps, JTBD, usability tests, synthesis
- **ux-strategy** — briefs, problem framing, principles, competitive analysis, metrics
- **design-systems** — tokens, component specs, naming, patterns, theming, icons, docs
- **ui-design** — color, typography, spacing, grids, hierarchy, responsive, dark mode, dataviz
- **interaction-design** — micro-interactions, states, loading, errors, feedback, gestures
- **prototyping-testing** — wireframes, flows, prototype strategy, heuristic eval, A/B tests
- **design-ops** — critique, reviews, QA checklists, handoff specs, sprints, workflow
- **designer-toolkit** — rationale, case studies, presentations, UX writing, adoption

### Inclusive design (5)
- **inclusive-design** — keyboard, touch targets, gestures, multi-modal, cognitive load, plain language, wayfinding, error recovery
- **accessible-content** — alt text, headings, links, forms, readable content, structure
- **adaptive-interfaces** — color independence, flexible type, density, user preferences
- **accessibility-process** — inclusive personas/stories, WCAG mapping, tradeoffs, a11y handoff
- **motion-sensitivity** — vestibular safety, prefers-reduced-motion, photosensitivity

### Engineering quality (7) — snapshotted, travel with the repo
- **dev-conventions** — git/commit discipline: atomic commits, `type(scope)` + why + Jira, four hard rules, and the stack-picking test; pairs with `no-slop` (git envelope vs code payload)
- **emil-design-eng** — animation & polish taste; when *not* to animate; Before/After/Why review format
- **frontend-design** — distinctive production UI, anti-generic by design (Anthropic official)
- **vercel-web-design-guidelines** — terse `file:line` UI code review (a11y, forms, hydration…)
- **vercel-react-best-practices** — React/Next.js performance rules
- **vercel-react-native-skills** — RN/Expo rules; only triggers on RN/Expo work
- **shadcn-ui** — Radix + Tailwind component patterns

### Figma (7)
`figma-use` (**mandatory prereq** before any `use_figma` call), figma-generate-design-new, figma-implement-design-new, figma-generate-library-new, figma-code-connect, figma-create-design-system-rules-new, figma-create-new-file

## Commands (10)
`/discover` (research cycle) · `/tokenize` (design system) · `/design-screen` (one screen end-to-end) · `/handoff` (dev handoff) · `/commit` (atomic commits the team's way) · `/slop-check` (anti-slop review gate) · `/taste-routine` (pull+analyze+sync+push in one) · `/taste-pull` (fetch inspiration from Slack) · `/taste-add` (file inspiration from taste/inbox/) · `/taste-sync` (regenerate the taste profile)

## Agents (5 — auto-activate)
Talk naturally; Claude routes. **New designers: say hello to Unicorn.**
- **unicorn** — studio lead; reads PRD/WBS in `./project/brief/`, tracks stage in `./project/STATE.md`, routes to specialists; **instructor** (explains) or **operator** (just runs) mode
- **designer-copilot** — senior design partner; challenge → explore → specify
- **ui-designer** — visual systems: color, type, grids, dark mode
- **design-system-architect** — tokens, components, theming
- **design-reviewer** — heuristics + accessibility + slop check

## Routing defaults
- Choosing a visual direction / moodboard / "what do we like" → `taste` + `no-slop`
- Task needs an external tool/site/reference → check `docs/resources.md`; suggest a listed resource only if it genuinely fits the need
- Animation/motion/polish → `emil-design-eng`, **always paired with** `motion-sensitivity` (safety is non-negotiable)
- New screens / bold direction → `frontend-design` + `no-slop`
- UI code review → `vercel-web-design-guidelines` + `no-slop`
- React perf → `vercel-react-best-practices`; RN/Expo → `vercel-react-native-skills`
- Committing / branching / pushing → `dev-conventions` + `/commit`; choosing a framework → the `dev-conventions` stack test, then record in `STATE.md`
- Build then check: color system → color independence · personas → disability-inclusive dimensions · components → keyboard nav · type scale → flexible typography

## Workspace (team routines: `docs/OS.md`)
Project artifacts have fixed homes — commands write there, don't scatter files:
`project/brief/` (inputs) · `project/research/` (/discover) · `project/design-system/` (/tokenize) · `project/screens/` (/design-screen) · `project/reviews/` (/slop-check) · `project/handoff/` (/handoff) · `project/STATE.md` (shared memory — update at every stage transition, append-only decisions) · `taste/` (team taste memory, fed from Slack)

## Conventions
- WCAG AA minimum; design for keyboard, screen reader, and reduced motion from the start
- Design tokens over raw values; adapt outputs to the project's existing stack
- Disability is a natural dimension in all personas and user stories
- Skills/commands/agents live in `.claude/`; MCP servers (Chrome DevTools, Figma) in `.mcp.json`
- Pre-consolidation versions of everything: git tag `pre-distill`
