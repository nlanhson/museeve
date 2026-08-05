```
 ___________ _
  \/                    __/   .::::.-'-(/-/)
                     _/:  .::::.-' .-'\/\_`*******          __ (_))
        \/          /:  .::::./   -._-.  d\|               (_))_(__))
                     /: (""""/    '.  (__/||           (_))__(_))--(__))
                      \::).-'  -._  \/ \\/\|
              __ _ .-'`)/  '-'. . '. |  (i_O
          .-'      \       -'      '\|
     _ _./      .-'|       '.  (    \\                         % % %
  .-'   :      '_  \         '-'\  /|/      @ @ @             % % % %
 /      )\_      '- )_________.-|_/^\      @ @ @@@           % %\/% %
 (   .-'   )-._-:  /        \(/\'-._ `.     @|@@@@@            ..|........
  (   )  _//_/|:  /          `\()   `\_\     |/_@@             )'-._.-._.-
   ( (   \()^_/)_/             )/      \\    /                /   /
    )  _.-\\.\(_)__._.-'-.-'-.//_.-'-.-.)\-'/._              /
.-.-.-'   _o\ \\\     '::'   (o_ '-.-' |__\'-.-;~ ~ ~ ~ ~ ~~/   /\
          \ /  \\\__          )_\    .:::::::.-'\          '- - -|
     :::''':::::^)__\:::::::::::::::::'''''''-.  \                '- - -
    :::::::  '''''''''''   ''''''''''''':::. -'\  \
_____':::::_____________________________________\__\______________________
```

<h1 align="center">Unicorn Skills</h1>

<p align="center">
  <em>A lean Claude Code template for design teams: <strong>29 dense skills</strong>, <strong>10 commands</strong>, <strong>5 agents</strong> — and a built-in allergy to AI slop.</em>
</p>

---

A Claude Code starter for design agencies turning designers into design engineers. Clone, open, go. Brief → design system → UI → code → handoff.

Two things make this template different:

1. **Lean by design.** Every skill here is a dense practitioner crib sheet, not boilerplate. One skill per discipline instead of ten thin ones — so Claude's context stays light and routing stays obvious.
2. **No slop.** The `no-slop` skill is always on: banned AI-default visuals (the purple-gradient hero, the three-feature-card row), banned hype copy, banned boilerplate code — enforced while generating and checked again at review with `/slop-check`.

## Start here

You're a designer. You opened Claude Code. Now what?

Say **"hi"** to **🦄 Unicorn** — the studio lead.

Unicorn reads your PRD from `project/brief/`, asks how you want to work (*instructor* = explains every step, *operator* = just runs the workflow), tracks the project stage in `project/STATE.md`, and pulls in the right specialist at the right time.

## Quick start

**Use the template** (easiest)
Click *Use this template* on GitHub → clone → open in Claude Code. Done — skills, commands, and agents are all in the repo.

**Or clone directly**
```bash
git clone https://github.com/hulusi-tunc/unicorn-skills.git my-project
cd my-project && rm -rf .git && git init
```

**One-time per machine: Chrome DevTools MCP**
```bash
npm install -g chrome-devtools-mcp
```

## What's inside

```
.claude/
  agents/        5 agents — Unicorn leads, 4 specialists support
  skills/        29 skills (bundled, no plugins, no install)
  commands/      10 slash commands
.mcp.json        Chrome DevTools + Figma
CLAUDE.md        The system: no-slop policy, inventory, routing
docs/OS.md       How we work — the team's co-working routines
project/         The workspace: brief in, STATE.md shared memory, every
                 command's output in its own folder (research, design-system,
                 screens, reviews, handoff)
taste/           The team's taste library — fed from Slack, read before designing
```

New to the team? Read [docs/OS.md](docs/OS.md) — one page: the session routine, daily/weekly rituals, and where everything lands.

## The 29 skills

| Family | Skills |
|---|---|
| **Guardrails** | `no-slop` — the anti-AI-slop rules for visuals, copy, and code · `taste` — the team's taste memory, read before choosing any visual direction |
| **Designer craft (8)** | `design-research` · `ux-strategy` · `design-systems` · `ui-design` · `interaction-design` · `prototyping-testing` · `design-ops` · `designer-toolkit` |
| **Inclusive design (5)** | `inclusive-design` · `accessible-content` · `adaptive-interfaces` · `accessibility-process` · `motion-sensitivity` |
| **Engineering quality (7)** | `dev-conventions` — git/commit discipline + stack picking · `emil-design-eng` · `frontend-design` · `vercel-web-design-guidelines` · `vercel-react-best-practices` · `vercel-react-native-skills` · `shadcn-ui` |
| **Figma (7)** | `figma-use` (mandatory prereq) + generate-design, implement-design, generate-library, code-connect, design-system-rules, create-new-file |

Each craft skill covers its whole discipline — `design-research` alone handles interviews, personas, journey maps, JTBD, usability tests, and synthesis.

## The 10 commands

| Command | What it runs |
|---|---|
| `/discover` | Full research cycle: plan → interview → synthesize → personas + journey |
| `/tokenize` | Stand up the design system: tokens, type, color, spacing + a11y checks |
| `/design-screen` | One screen end-to-end: grid → hierarchy → states → inclusive pass → slop check |
| `/handoff` | Dev handoff: spec, a11y notes, QA checklist, Figma code-connect |
| `/commit` | Atomic commits the team's way: type + why + Jira, never main, never `git add -A`, never AI-signed |
| `/slop-check` | The anti-slop review gate over any design, copy, or code |
| `/taste-routine` | Pull + analyze + sync + push the taste library in one command |
| `/taste-pull` | Pull new inspiration from Slack `#design-inspiration` into the taste library |
| `/taste-add` | File inspiration from `taste/inbox/` into the taste library |
| `/taste-sync` | Regenerate `taste/TASTE.md`, the team's synthesized taste profile |

The taste loop: post inspiration to `#design-inspiration` with a line about why you like it → `/taste-pull` files and analyzes it → `/taste-sync` keeps the team taste profile sharp → every new design consults it. 👍/👎 reactions in Slack re-weight entries. Details: [docs/plans/slack-taste-loop.md](docs/plans/slack-taste-loop.md).

## The 5 agents

| Agent | What it does |
|---|---|
| **🦄 unicorn** | Studio lead — talk to it first. Reads your brief, tracks stage, *instructor* or *operator* mode |
| **designer-copilot** | Senior design partner — challenge → explore → specify |
| **ui-designer** | Color, typography, grids, responsive, dark mode |
| **design-system-architect** | Tokens, components, theming |
| **design-reviewer** | Heuristics + accessibility + slop check |

## How skills pair

Build with one, check with the other:

| Build with… | …then check with |
|---|---|
| `ui-design` (color system) | `adaptive-interfaces` (color independence) |
| `emil-design-eng` (motion) | `motion-sensitivity` (vestibular safety — always) |
| `design-research` (personas) | `accessibility-process` (disability-inclusive) |
| `design-systems` (components) | `inclusive-design` (keyboard nav) |
| `dev-conventions` (the commit + git envelope) | `no-slop` (the code inside the commit) |
| anything shipped | `/slop-check` |

## Where did the other 86 skills go?

This template used to carry 113 skills and 27 commands, mostly ~500-word boilerplate that double-loaded through marketplace plugins. They were distilled into the dense skills above — same knowledge, a fraction of the context cost. Everything pre-consolidation is preserved at the git tag **`pre-distill`**:

```bash
git checkout pre-distill -- .claude/skills-archive   # restore any old path
```

## Credits

- Designer + inclusive-design source material — [MC Dean](https://marieclairedean.substack.com/) · [Owl-Listener/designer-skills](https://github.com/Owl-Listener/designer-skills) · [Owl-Listener/inclusive-design-skills](https://github.com/Owl-Listener/inclusive-design-skills)
- `frontend-design` — [Anthropic](https://github.com/anthropics/claude-plugins-official)
- `shadcn-ui` — [Giuseppe Trisciuoglio](https://github.com/giuseppe-trisciuoglio/developer-kit)
- `emil-design-eng` — Emil Kowalski's animation philosophy
- Vercel engineering skills — snapshotted from the Vercel team's upstream guidance
