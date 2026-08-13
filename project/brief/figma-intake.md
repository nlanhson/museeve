# Figma intake — Museeve ("Music Everywhere")

**Source:** [`-ME- wireframe`](https://www.figma.com/design/8eSSaL6bKgsphXKKTXGUtx/-ME--wireframe) · file key `8eSSaL6bKgsphXKKTXGUtx`
**Read on:** 2026-08-10 · read-only, via Figma MCP
**Status:** stand-in brief. Replace/augment when the client WBS lands.

The file has two pages: **Page 1** (`0:1`, all the work) and **Presentation** (`457:26551`, not yet read).

---

## 1. What the product is

A mobile app for the music world with **three account types** — **Fan**, **Artist**, **Institution** (venues/schools/labels). The wireframes cover far more than a single feed: social, community, monetization, instrument and venue rental, and a music-partner finder. Institutions go through document verification and a Stripe payout connection, so the app moves real money.

Product name: **Museeve** (confirmed 2026-08-11). The **Music Everywhere** serif-italic wordmark in the file is a placeholder lockup only — not the name, not a tagline.

---

## 2. Build target — the `Main Design` section (`468:30959`)

This is the section the client linked and the most current work. 10404×5767 canvas, six labelled rows.

### Row 1 — Authentication *(marked WIP)*
| Node | Screen |
|---|---|
| `468:29282` | Splash Screen |
| `468:27410` | Login |
| `468:29835` | Login – via Apple (native Apple sheet) |
| `468:27887` | Login – OTP Verify ("Verify your email") |
| `468:28807` | Login – OTP Verify (keyboard open) |
| `550:31514` | Login – Welcoming screen |

Flow: Splash → Login (email + Google / Apple / Facebook) → email OTP → Welcome. There is an **animation reference** frame beside this row — motion is expected here, so `emil-design-eng` applies, always paired with `motion-sensitivity`.

### Row 2 — Onboarding *(marked WIP)*
| Node | Screen |
|---|---|
| `709:10967` | Onboarding — "Your account type" |
| `709:11230` / `709:11299` / `709:11379` | Account-type cards: **Artist**, **Fan**, **Institution** |

The three cards are the fork in the road; everything after this branches by account type.

### Row 3 — Fan onboarding
| Node | Screen |
|---|---|
| `545:29011` | Phone verification |
| `720:19453` | Enter the code |
| `720:19575` | Create your profile (part 1) |
| `720:19771` | Create your profile (part 2 — genres, mood, bio) |
| `545:28983` | "Your profile is ready" |

### Row 4 — Artist onboarding
| Node | Screen |
|---|---|
| `720:20073` | Phone verification |
| `720:20111` | Enter the code |
| `720:20210` | Setup your profile (part 1) |
| `720:20741` | Setup your profile (part 2 — role, instruments, genres, experience) |
| `545:28997` | "Your profile is ready" |
| `545:33627`, `545:33657` | Two marketing/recap screens ("Your music, reimagined as records", "Here's a week of Our welcome gift to you") |

The Artist form is materially longer than the Fan form — more selects, more free text.

### Row 5 — Institution onboarding *(the heaviest flow)*
| Node | Screen |
|---|---|
| `709:15118` | Phone verification |
| `709:15156` | Enter the code |
| `6068:2691` area → `545:33033` | Setup your profile (part 1) |
| `545:33155` | Setup your profile (part 2 — org name, type, licence, website) |
| `550:37118` | Upload supporting documents |
| `720:21640` | Upload supporting documents — source picker sheet (Choose from Files / Choose from Photos) |
| `621:12857` | Upload supporting documents — uploaded list with progress |
| `621:15026` | Connect with Stripe |
| `621:18926` | Payment Verification / account created |

Note the Stripe screens use a **blue/violet** button, breaking the crimson palette — either an intentional Stripe-brand affordance or an unresolved inconsistency. Worth confirming.

### Row 6 — Home Screen *(marked "extra + WIP")*
| Node | Screen |
|---|---|
| `463:16411` | Home — story rail across the top, full-bleed media feed card, 5-tab bottom bar with a centre action |

Only one home screen exists so far. The post-onboarding product is largely undesigned in this section — it lives in the older feature sections below.

---

## 3. Other feature areas on Page 1

These predate `Main Design` and hold the actual post-onboarding product. Full screen-by-screen map with node ids: **`figma-feature-areas.md`**.

| Node | Area | Size |
|---|---|---|
| `4:2` | Email sign up | 1782×1050 |
| `8:41` | Social sign up | 1881×1137 |
| `9:55` | Forget psw | 3553×1281 |
| `172:7070` | Guest mode | 1971×1310 |
| `25:981` | **Social** | 22917×11590 (203 nodes — the biggest area by far) |
| `63:12433` | **Monetization** | 6267×5773 |
| `80:6836` | **Community** | 8447×5003 |
| `141:6666` | **Instrument / venue rental** | 12017×9681 |
| `350:7682` | **Music partner finder** | 7286×3401 |
| `343:7496` | New Design (section) | 22326×15292 |
| `359:8558` | Inspo (section) | reference/moodboard, not build material |

---

## 4. Design system — what the file already gives us

The file carries real Figma variables, so `/tokenize` starts from data rather than guesses.

**Colour** — dark-first.
- Primary / brand: `#8b1c1c` (deep crimson) — `bg_primary_normal`, `fg_primary_normal`, `primary-solid-500`
- Primary faded: `#1c0606` · primary on-background: `#f7d8d8`
- Surfaces: `#141414` (gray-true-900), `#171717` (bg secondary), `#454545` (elevation level 2)
- Text: `#ffffff` on-background · `#e7e7e7` normal · `#888888` faded/sub · `#5d5d5d` placeholder
- Borders: `#262626` stroke primary · `#5d5d5d` faded/disabled
- Status: danger `#e11d48` · error `#d92d20` · success `#17b26a`

**Type** — two families plus platform-native.
- Display: **Beautique Display** (Bold; used for Title 1 / 52-64 and Title 3 / 40-52; letter-spacing −1). Licensed font — a licence check is needed before it ships in an app binary.
- Body/UI: **DM Sans** (Light 300 / Regular 400 / Medium 500 / SemiBold 600)
- Scale: 10 / 12 / 14 / 16 / 24 / 40 / 52 with line heights 14 / 18 / 20 / 24 / 32 / 52 / 64

**Spacing:** 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32
**Radius:** 0, 2, 8, 12, 32, 999 (full)
**Borders:** 0.5, 1, 1.5
**Effects:** `shadow-xs-skeuomorphic`, `shadow-md`, `backdrop-blur-md` (radius 16), plus Apple "Liquid Glass" values on native-looking surfaces

---

## 5. Findings the team must resolve

1. **Three token systems coexist.** A `var(--…)` MDS-style set (the intended one), an Inter-based `Golbal_Typography` / `Global_Spacing` set with typos in the names, and Apple defaults (SF Pro, Liquid Glass, status-bar metrics) pulled in with native components. `/tokenize` has to pick one and map the strays onto it, or the RN theme inherits the mess.
2. **Beautique Display licensing.** Display face used at hero sizes across auth and onboarding. Embedding in an app binary needs a licence that covers it; otherwise a substitute has to be chosen now, not at handoff.
3. **Contrast risk on the dark palette.** `#888888` on `#141414` is roughly 5.3:1 — passes AA for body text. `#5d5d5d` placeholder on the same ground is about 2.6:1 — **fails AA**, and placeholders carry real instructions in these forms. Needs a fix during `/tokenize`.
4. **Stripe screens break the palette** (blue/violet CTAs). Intentional or leftover?
5. **Post-onboarding product is thin in `Main Design`.** One home screen. The Social / Community / Monetization / Rental / Partner-finder areas are older and may not match the current visual direction — confirm which is canonical before any of it gets built.
6. **Auth appears twice.** `Main Design` row 1 vs the older `Email sign up` / `Social sign up` / `Forget psw` / `Guest mode` areas. `Main Design` is assumed canonical; the older areas still hold flows the new row lacks (password reset, guest mode) that will have to be redesigned or ported.
7. **Phone verification *and* email OTP both exist.** Auth verifies email, then each account-type flow verifies a phone number. Two verifications back to back — deliberate, or a merge artefact?
8. **Rasterization blocks whole feature areas.** Instrument/venue rental is ~2% rebuildable layers, Guest mode 0%, Music partner finder ~5%. See `figma-feature-areas.md`.
9. **Three different bottom tab bars** appear across the file. The app's navigation skeleton is undecided. See `figma-feature-areas.md`.
10. **No checkout screen anywhere.** Monetization designs the tier picker and the earnings dashboard but never card entry or a receipt, and the rental flow assumes a deposit-then-balance payment that is only described in annotation text.

---

## 6. Still needed

- **The client WBS** → drop in `project/brief/`
- Jira `DUME` backlog read-through, to line screens up against tickets
- Confirmation on which feature areas are in scope for v1
