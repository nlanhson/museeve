---
description: Stage and commit the current work the team's way — atomic commits, type + why + Jira message, never main, never git add -A, never signed by AI.
argument-hint: [optional Jira key, e.g. VOCO-231]
---
# /commit
Turn the working tree into clean, atomic, reviewable commits following the `dev-conventions` skill. Load `dev-conventions` first.

## Refuse up front
- If the current branch is `main` (or `master`), stop. Say so, and offer to create a feature branch first. Never commit to `main`.
- Never run `git add -A` or `git add .`. Stage named paths only.

## Steps
1. **Survey** — `git status` and `git diff` to see everything unstaged. Read it. Never stage a hunk you have not read.
2. **Group into atomic commits** — Split the changes into one logical change per commit (the revert test: each commit must be reversible on its own without dragging unrelated changes). Bundled work becomes several commits, not one. Flag anything that looks unrelated or accidental (a stray `.env`, key, build artifact, `console.log`) and leave it unstaged unless the user confirms.
3. **Per commit** — Stage that group's paths explicitly (`git add <path>` or `git add -p` to split hunks). Then write the message:
   ```
   type(scope): what changed, imperative

   why this change was needed

   Jira: KEY-123
   ```
   Use the `$ARGUMENTS` Jira key if given; otherwise ask for it (the line is mandatory). Pick `feat / fix / refactor / chore` by what the diff does — if unsure, say why you chose the type.
4. **Pre-commit check** — Right type? Readable subject? Body gives the reason, not the what? Jira line present? Any "no" blocks the commit.
5. **Commit** — No AI signature. Never add `Co-Authored-By: Claude`, a "generated with" line, or a session link. The author is the human.

## Push
Only if asked. Push the feature branch (`git push -u origin <branch>`), never `main`. Then offer to open the Jira-linked MR. Do not push an empty or unreviewed commit.

## Output
Report the commits made (one line each: `type(scope): summary` + Jira key), what was intentionally left unstaged and why, and the branch. If a stack or architecture decision was part of this work, remind the user to record it in `project/STATE.md`.
