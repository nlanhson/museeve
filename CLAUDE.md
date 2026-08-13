# Project Configuration — Museeve

Design repo for Museeve. The deliverable is design work, not a running app: screen concepts, the Figma intake that produced them, and the decisions behind both. Keep it lean; keep it slop-free.

## What lives here

- `project/STATE.md` — shared memory across sessions. Update at every stage transition; decisions are append-only, never deleted.
- `project/brief/` — Figma intake, screen inventory, feature-area map, client WBS.
- `project/screens/concepts/index.html` — the 9 screens × 3 directions concept site. Self-contained: one file, inline SVG sprite, no assets, no build.
- `project/design-system/logo/` — logo exploration batches.
- `project/research/`, `project/reviews/`, `project/handoff/` — empty, reserved for `/discover`, `/slop-check`, `/handoff`.

Commands write to these fixed homes. Don't scatter files.

## Publishing the concepts site

Two ways to view it:

- **Shared link** — https://nlanhson.github.io/museeve/, served by GitHub Pages from the `gh-pages` branch. That branch holds a deploy copy of `index.html` plus `.nojekyll` and nothing else, so reviewers see the site and not the repo.
- **Locally** — `python3 -m http.server 4028` inside `project/screens/concepts/`, then open http://localhost:4028.

`gh-pages` is a deploy artifact, not a source branch. After editing the concepts page on `main`, copy it over and push:

```
git checkout gh-pages && git checkout main -- project/screens/concepts/index.html
mv project/screens/concepts/index.html index.html && rm -rf project
git commit -am "chore(pages): sync concepts site" && git push && git checkout main
```

## No-slop policy (always on)

The `no-slop` skill is a standing constraint, not an on-demand tool:
- **Generating** any UI, copy, or frontend code → apply `no-slop` rules while generating.
- **Reviewing** any design or code → `/slop-check` (or the `no-slop` checklist) is part of the review, alongside heuristics and accessibility.
- Generic AI-default output (interchangeable layouts, hype copy, boilerplate code) is treated as a defect, same severity as a broken state.

## Developer conventions (always on)

The client receives the whole repo and its history; the commit log is a deliverable. The `dev-conventions` skill applies whenever anything touches git:
- **Committing / branching / pushing** → apply `dev-conventions`; run `/commit` to do it end to end.
- **Hard rules:** never `git add -A` (stage read paths only) · never let AI sign the commit (no `Co-Authored-By: Claude`) · atomic commits, one reversible change each, `type(scope): what` + why.
- **Jira:** project key `DUME`, read-only. Commits carry a `Jira: DUME-123` trailer once real tickets exist. The initial push deliberately has none — no tickets covered that work.

## Client direction

- **Brand name is Museeve.** The "Music Everywhere" serif-italic wordmark in the Figma file is a placeholder, not the name and not a tagline.
- **The client would hate an Instagram look.** Concepts use music-world patterns — concert programme, record shelf, membership card, playbill — not photo-feed social defaults.
- **Fidelity is strict to the validated Figma set** for anything that reuses it: exact colors, type, spacing from the file's `var(--…)` tokens. Deviations only where the design is broken (e.g. placeholder contrast failing WCAG AA), and each one gets recorded in `STATE.md`.
- **Three options per screen, never more.** The client is decisive-averse; extra options deepen the paralysis.

## Conventions

- WCAG AA minimum; design for keyboard, screen reader, and reduced motion from the start.
- Design tokens over raw values.
- Disability is a natural dimension in all personas and user stories.
- Skills, commands, and agents live in `.claude/`; MCP servers (Chrome DevTools, Figma) in `.mcp.json`.
- `figma-use` is a **mandatory prereq** before any `use_figma` call.

## Known gap

The `taste` skill and the `/taste-*` commands are still in `.claude/` but the `taste/` library they read was removed from this repo. They will not work here. The team taste memory lives in the `unicorn-skills` repo.
