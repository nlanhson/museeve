# Running the OS in Claude Desktop (Cowork)

Cowork has three panels that map onto our OS. Set them up once per person.

| Cowork panel | What to put there | Our equivalent |
|---|---|---|
| **Instructions** (right, top) | The project rules block below | a short pointer to `CLAUDE.md` + `OS.md` |
| **Scheduled** (right / left nav) | The taste routine, daily | the `/taste-routine` command |
| **Memory** (right, bottom) | Let Claude save facts as you work | persistent context |
| **Context** | Already shows the `unicorn-skills` repo | the workspace |

## 1. Instructions — paste this

Click the pencil on **Instructions** and paste:

```
This is the unicorn-skills design studio OS. Before any work, read CLAUDE.md
and docs/OS.md and follow them. Standing rules:
- no-slop is always on: never ship the AI-default look (purple gradients,
  three-feature-card rows, Inter for everything, hype copy). Generic output
  is a defect.
- Consult taste/TASTE.md before proposing any visual direction.
- Project artifacts have fixed homes under project/ (research, design-system,
  screens, reviews, handoff). Update project/STATE.md at each stage.
- Follow the developer conventions (docs/conventions/common.md): never push to
  main, never git add -A, always link the Jira ticket, never let AI sign the
  commit. Atomic commits, type(scope) + why + Jira. Use /commit.
```

## 2. Scheduled — the taste routine

Click **+** on the **Scheduled** panel. Set:

- **Frequency:** Daily, ~9:00 (your timezone)
- **Task prompt:** paste this ↓

```
Run the taste routine for this repo:
1. Read taste/slack.json for the channel id and last_ts.
2. Read new messages in Slack #design-inspiration since last_ts. For each
   message that has an image: view the image, then write a library entry to
   taste/library/<date>-<slug>.md following the taste skill's data model —
   the poster's words VERBATIM, a 5-bullet analysis, and one "steal this"
   line. Reference the image as slack://<file_id> plus its permalink. Add a
   white_check_mark reaction to each filed message.
3. Advance last_ts in taste/slack.json to the newest message.
4. If anything changed, regenerate taste/TASTE.md per the taste-sync command.
5. Commit everything under taste/ as "taste: routine sync <date>" and push.
6. Report: N new, M rescored, pushed yes/no. If Slack is unavailable, stop
   and say so — do not push an empty commit.
```

## 3. Test BEFORE you trust the schedule

Scheduled Cowork tasks run in the background. The one thing that may or may not
carry over is the **Slack connection** — it's tied to your logged-in account, and
background runs sometimes don't have it. So:

1. Paste the task prompt above into the normal Cowork chat and run it **once, by hand.**
2. Confirm it: reads Slack, writes an entry, and pushes to GitHub.
3. **If it works by hand → schedule it.** If it can't reach Slack when run by hand,
   the schedule won't either — fall back to running `/taste-routine` yourself daily,
   or build the Vercel bot (`docs/plans/slack-taste-loop.md` appendix) for true
   unattended runs.

Don't skip the manual test — a schedule that silently fails looks the same as one
that works until you check the library and it's empty.

## What Cowork can and can't do here

- **Can:** read the repo, read Slack (interactively), analyze images, write files,
  commit, push — the full routine, when run with you present.
- **Unsure until tested:** the same routine on a background schedule (Slack access).
- **For guaranteed zero-touch:** the Vercel bot uses a real bot token, not your
  session, so it never depends on anyone being logged in.
