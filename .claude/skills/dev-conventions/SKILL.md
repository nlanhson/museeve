---
name: dev-conventions
description: The team's developer conventions for git, commits, branching, and stack choice. Apply when staging, committing, branching, pushing, or writing any commit message, and when choosing a framework for a new app or page. Enforces atomic commits (one logical change each), the type(scope) + why + Jira message format, and four hard rules - never push to main, always link the Jira ticket, never git add -A, never let AI sign the commit. Includes the "does a stranger need to find this on Google?" stack test (Next.js vs plain React/Vite vs React Native + Expo). Pairs with no-slop for code-level review.
---

# Developer conventions

The client receives the repo, and with it the whole history. Six months after handover, the commit log is the only record of why the code looks the way it does - there is no designer in the room to ask. So the log is a deliverable, held to the same bar as the UI: readable, honest, and something a stranger can act on. A commit history is version history with names on each version, the way Figma names each save. Treat a convention breach here the way `no-slop` treats a purple-gradient hero: a defect that blocks ship, not a style note.

These rules apply to every repo the team touches. When a client's own contribution guide conflicts with a rule here, the client wins - and you write that down in `project/STATE.md`. Otherwise these are not suggestions.

## The four hard rules

| Rule | If you skip it |
|---|---|
| Never push to `main` | You break it, the team breaks - nobody reviewed it. Branch, open an MR, let CI and a human pass it. |
| Always link the Jira ticket | In six months the ticket is the only thing that explains *why*. A `Jira: KEY-123` line is not optional. |
| Never `git add -A` | One stray `.env`, key file, or password ends up on GitLab forever. Stage named paths you have read. |
| Never let AI sign the commit | You read it, you approved it, you committed it. The author field answers one question: who is accountable. Always you. |

## Atomic commits - one logical change each

One commit is one reversible decision. Bundling five unrelated changes under a single `update` means that next month, when the client says "drop the button effect, keep the hero," you cannot roll back the button without losing the hero too. Split the work so any one piece can be dropped in ten seconds.

The test: **can this commit be reverted on its own without taking anything unrelated with it?** If reverting it would also undo a change that has nothing to do with it, it is two commits.

One real 54-file, 1,684-line change, split so it survives a client edit:

```
feat(hero):        fluid layer replaces static artwork
feat(button):      two variants, pixel-fill effect
feat(talent):      paginate showcase, 6 cards per page
fix(talent-card):  skills overflow in narrow column
refactor(ai):      drop duplicated role list
```

Client says "lose the pixel-fill." You revert `feat(button)`. The rest stands. Ten seconds, not a merge conflict.

Stage with intent to make this possible: `git add path/to/file` for the paths this commit owns, or `git add -p` to split a file's hunks across commits. Read the diff before you stage it (`git diff --staged`). Staging is where atomic commits are won or lost.

## Commit message format

Three lines. Five seconds to write, and it answers type, reason, and ticket:

```
type(scope): what changed, in the imperative

why this change was needed - the reason, not the diff

Jira: KEY-123
```

The scope is the area touched (`hero`, `button`, `talent-card`). The summary says what, in the imperative ("add", "drop", "fix"), under ~60 characters. The body says *why* - what the diff cannot show. The Jira line is mandatory.

### Types

| Type | Use for |
|---|---|
| `feat` | something new the user can see or do |
| `fix` | something broken now works |
| `refactor` | cleanup with no user-visible change (UI identical before and after) |
| `chore` | assets, config, dependencies, tooling - no product logic |

Not sure which type it is? Ask - describe the change and let Claude classify it. A `feat` that is really a `fix`, or a `refactor` that quietly changed the UI, is a mislabeled commit that misleads the next reader.

### Message slop (see `no-slop` for the full list)

- No emoji or sparkles in the subject or body.
- No AI signature trailer. Never `Co-Authored-By: Claude`, never a "generated with" line, never a session link. Accountability is yours.
- No `WIP`, `stuff`, `update`, `fixes` as a whole message. If you cannot name what changed, the commit is not ready.
- Body explains why, never restates the what. "Change color to blue" above a one-line color diff is noise; "brand refresh - matches the new logo palette" is the reason.

## The pre-commit check

Before every commit, four questions. Any "no" blocks the commit until fixed:

1. **Right type?** Does `feat / fix / refactor / chore` match what the diff actually does?
2. **Readable?** Would a stranger understand what changed from the subject alone?
3. **Reason given?** Does the body say *why*, not just repeat the *what*?
4. **Jira line present?** Is `Jira: KEY-123` there and correct?

And before staging: **did I read every hunk I am adding?** No `git add -A`, no blind staging.

## Picking the stack

One question decides the framework for a new app or page: **does a stranger need to find this on Google?**

| Answer | Stack | For |
|---|---|---|
| Yes, rich public content | Next.js (SSR) | landing, marketing, blog, e-commerce |
| No, behind login | Plain React (Vite) | admin, back-office, dashboard, portal |
| Throwaway prototype | Plain React | quick demos, spikes |
| Mobile app | React Native + Expo | native iOS / Android |

Why it matters: SSR bills per visit and adds build complexity; static files are nearly free, and a page behind login needs no SEO. Left alone, an AI defaults to Next.js for everything - so state the constraint out loud: "this page is behind a login" gets you plain React and a cheaper, simpler build.

**The rule is ask, not guess.** Confirm the choice with the tech lead before scaffolding, then record it in `project/STATE.md` under Decisions so the next person inherits the reasoning, not just the folder. For the framework-specific quality rules once the stack is set, hand off to `vercel-react-best-practices` (React/Next.js) or `vercel-react-native-skills` (RN/Expo), and `shadcn-ui` for components.

## Where this fits

- Stack and architecture decisions go in `project/STATE.md` (append-only Decisions), same log Unicorn keeps for design-stage calls.
- Code-level review of what a commit contains - dead abstractions, className soup, bare TODOs, `console.log` - is `no-slop`'s Code slop section. This skill governs the git envelope; `no-slop` governs the payload.
- `/commit` runs this end to end: stage intentionally, split into atomic commits, write the message, and refuse `main`, `git add -A`, and any AI signature.
- People hold the rule; a hook only reminds. There is no lint gate enforcing this yet - it lives in the reviewer's head and in this skill. Hooks come later, announced in advance.
