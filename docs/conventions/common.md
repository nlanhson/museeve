# Developer conventions

The shared rulebook for how we write git history and pick a stack. One page. If a convention is not here, it is not a convention. The `dev-conventions` skill teaches Claude to apply all of this automatically; this doc is the human reference and the thing a new teammate reads on day one.

Why it matters in one line: the client receives the whole repo and its whole history, and six months later the commit log is the only record of why the code is the way it is.

## The four hard rules

- **Never push to `main`.** Branch, open a merge request, let CI and a human pass it.
- **Always link the Jira ticket.** Every commit ends with a `Jira: KEY-123` line. The ticket is the only thing that still explains *why* in six months.
- **Never `git add -A`.** Stage named paths you have read. One stray `.env` or key file on GitLab is forever.
- **Never let AI sign the commit.** No `Co-Authored-By: Claude`, no "generated with" trailer. You read it, you approved it, you own it.

## Atomic commits

One commit is one reversible decision. Never bundle unrelated changes under a single `update` - next month a client asks to drop one thing, and a bundled commit cannot be reverted without losing the rest.

Test each commit: can it be reverted on its own without dragging unrelated changes with it? If not, it is more than one commit.

The same 54-file change, split so it survives a client edit:

```
feat(hero):        fluid layer replaces static artwork
feat(button):      two variants, pixel-fill effect
feat(talent):      paginate showcase, 6 cards per page
fix(talent-card):  skills overflow in narrow column
refactor(ai):      drop duplicated role list
```

Client says "lose the pixel-fill." Revert `feat(button)`. The rest stands.

## Commit message format

```
type(scope): what changed, in the imperative

why this change was needed - the reason, not the diff

Jira: KEY-123
```

| Type | Use for |
|---|---|
| `feat` | something new the user can see or do |
| `fix` | something broken now works |
| `refactor` | cleanup, UI unchanged before and after |
| `chore` | assets, config, dependencies, tooling |

Not sure which type? Describe the change to Claude and let it classify. No emoji, no AI signature, no `WIP` as a whole message.

### The five-second check before you commit

1. Right type - does `feat / fix / refactor / chore` match the diff?
2. Readable - clear from the subject alone?
3. Reason given - does the body say why, not repeat the what?
4. Jira line present and correct?
5. Did you read every hunk you staged? (No `git add -A`.)

## Picking the stack

One question: **does a stranger need to find this page on Google?**

| Answer | Stack |
|---|---|
| Yes, rich public content (landing, marketing, blog, e-commerce) | Next.js (SSR) |
| No, behind login (admin, back-office, dashboard, portal) | Plain React (Vite) |
| Throwaway prototype | Plain React |
| Mobile app | React Native + Expo |

SSR bills per visit; static files are nearly free, and pages behind login need no SEO. AI defaults to Next.js unless you say "this page is behind a login." Ask the tech lead first - the rule is ask, not guess - then record the choice in `project/STATE.md`.

## How Claude gets these rules

- **In this repo:** the `dev-conventions` skill and the `/commit` command are bundled in `.claude/`. Nothing to install - clone and go.
- **In a client project:** run `@du/dev-init` to write these conventions into that repo's `CLAUDE.md` (between `DU:BEGIN` and `DU:END`) plus a copy of this doc, so Claude matches company conventions there too. It asks two things - the Jira project key and which AI assistant - and leaves two files: `docs/conventions/common.md` and the `CLAUDE.md` block.

Rules are held by people; a hook only reminds. There is no enforcing lint gate yet - it lives in the reviewer's head, in the `dev-conventions` skill, and in this doc. Hooks come later, announced in advance.
