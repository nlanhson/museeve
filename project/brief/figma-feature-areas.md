# Figma feature-area map — Page 1 (outside `Main Design`)

**Source:** [`-ME- wireframe`](https://www.figma.com/design/8eSSaL6bKgsphXKKTXGUtx/-ME--wireframe) · file key `8eSSaL6bKgsphXKKTXGUtx`
**Read on:** 2026-08-10 · read-only
**Companion doc:** `figma-intake.md` (covers the `Main Design` section — auth, onboarding, home)

These nine areas predate `Main Design` and hold the actual product: everything that happens after a user finishes onboarding. Node ids below are what design-to-code calls need.

---

## Cross-cutting findings — read these first

**1. Rasterization is the single biggest blocker.** Large parts of the file are flattened PNGs, not rebuildable layers:

| Area | Rebuildable |
|---|---|
| Email sign up / Social sign up / Forget psw | ~100% — cleanest in the file |
| Social | mixed |
| Community | mixed |
| Monetization | mostly, with raster gaps |
| Music partner finder | ~5% (1 real screen of ~15) |
| Instrument / venue rental | ~2% (2 real frames of 112 children) |
| Guest mode | 0% — one flat image |

Where a flow exists only as a PNG, its logic survives only in annotation text sitting on top of it. Those areas need editable source from the designer, or they get treated as written specs and redesigned.

**2. Two design eras coexist.** The auth areas are clean **light-mode** wireframes at 390×844 with semantic layer names (`status-bar`, `input-wrapper`, `button-cta`). The feature areas are **dark-mode**, 366–420 wide, with frames named just "Frame" or "Music everywhere_BA". `Main Design` is a third, newer, dark era. Nothing reconciles them.

**3. The global tab bar is undecided.** Three different bottom navs appear across the file:
- Guest mode: Home / Events / Groups / Looking / Profile
- Music partner finder (real frame): Home / Event / Rent / Training / Group
- Music partner finder (raster screens): Home / Explore / Post / Groups / Profile

This has to be settled before any navigation code gets written — it is the app's skeleton.

**4. No canonical artboard width.** 366, 390, 393, 397, 404, 405, 412, 417 all appear. Build responsive; do not pin to a fixed width.

---

## Social (`25:981`)

Biggest area in the file — 22917×11590, 203 direct children. Horizontal swimlanes covering the whole social product: three profile types × two viewing contexts, plus posts, stories, home/discovery, notifications, and moderation.

**Lane banners:** `25:7168` Artist/Self-View · `25:7171` Artist/Other-View · `25:29414` Fan/Self-View · `25:29418` Fan/Other-View · `25:29413` Institution/Self-View · `25:29417` Institution/Other-View · `63:11895` Home

### Artist — Self-View
Chips: View profile → Edit profile → Delete account
- `25:6590` — View artist profile (390×1401)
- `25:6652` — View artist profile (390×1401)
- `25:6777` — View artist profile (390×1216)
- `25:6893` — View artist profile / Music (390×1224)
- `25:7013` — View artist profile (390×844)
- `25:7150` — View artist profile / Edit profile (390×972)
- Delete account: raster only (`63:12506`, `63:12509`)

### Artist — Other-View
Chips: View profile → Follow → Unfollow → Message → Block user → Manage blocked list
- `25:6714` — View artist profile (390×1227)
- `63:12438` — messaging (417×928)
- `63:12467` — messaging (397×928)
- `63:11785` — block flow (412×926)
- `63:11806` — block flow (405×924)
- Raster: `54:6327` / `54:6330` (follow/unfollow states, overlays `54:6332`, `54:6358`), `63:11783` (block user), `63:12713` (manage blocked list)

### Moderation — report user
Chips: Report user → Choose reason
- `63:12526` (393×852) · `63:12678` (405×924) · raster `63:12524`, `63:12702`

### Moderation — report post
Chips: Report post → Choose reason → Input reason (optional)
- `63:10809` (393×870) · `63:10989` (393×852) · `63:11432` (393×852) · raster `63:11772`

### Posts
Chips: Create photo/video post → View post details → Like → Comment → Delete comment → Report comment; self-view divider `42:35876` over Edit post → Delete post
- `25:33276` — Create Story and Post (390×844)
- `25:33353` — New post (390×844)
- `25:33389` — New post (390×844)
- `25:33662` — Post details (390×1467)
- `42:36025` — Post / comments (390×844)
- `42:36734` — delete comment (390×844)
- `42:36782` — confirm dialog (390×500)
- `98:6953` — report comment (393×707)
- `61:10618` — edit-post entry (393×870)
- `25:33962` — edit post form (393×1228)
- `25:34134` — delete post (393×870)
- Raster: `42:36728`, `42:36803`

### Stories
Chips: Create story → View story (self-view divider `42:35535`, other-view `42:35538`) → Highlight story
- `42:34782` — Create Story and Post (390×844)
- `42:34989`, `42:35012`, `42:35171` — New story — **all three are empty frames, 0 children**
- `42:35210` — story entry point (390×1401)
- `42:35378` — story self-view (holds image `42:35453`) · `42:35455`
- `42:35540` — story other-view (holds image `42:35566`) · `42:35495`
- Highlight story: entirely raster (`42:35765`, `42:35769`, `42:35772`, `42:35775`, `42:35778`, `42:35783`, `42:35795`, `42:35804`) with two conditional notes — `42:35767` "If there is no highlights before => Need to create a highlight first" and `42:35780` "If there are Highlights are already created"

### Home / Discovery / Notifications
- `63:11896` — Home (390×2476)
- Raster: `63:12932` (notifications), `63:12939` (mark as read)

### Fan — Self-View
- `25:28522` (390×1227) · `25:28759` (390×1252) · `25:29174` (390×844) · `25:29396` — Edit profile (390×972)

### Fan — Other-View
- `25:28580` (390×1227) · `25:28813` (390×1216) · `25:29243` (390×844)

### Institution — Self-View
- `25:28461` (390×1227) · `25:28702` (390×1216) · `25:28926` (390×1224) · `25:29105` (390×844)
- `25:29379` — named **"View artist profile / Edit profile"** but sits in the institution lane

### Institution — Other-View
- `25:28639` (390×1227) — the only screen; text node `63:12715` reads "Same flow with artist"

**Open questions**
- Three `New story` frames are empty containers — content missing or never built.
- `25:29379` mis-named, or is institution edit-profile genuinely identical to artist?
- Institution Other-View has one screen plus a "same flow" note — confirm Follow/Subscribe UI is really reused.

---

## Monetization (`63:12433`)

Fan-side supporter payments (recurring subscription + one-time gifts) and a creator-side earnings dashboard.

**Supporter path**
- `61:8189` (393×852) — "Support DJ Alex", Subscribe tab, Monthly / Semi-yearly / Yearly tiers, CTA "Subscribe · 5.00 €/month"
- `61:10269` (393×852) — One-time tab: 3 € / 5 € / 10 € / 20 €, CTA "Support with 5.00 €"
- `61:8599` (393×843) — subscribed state, "Manage subscription"
- `61:9848` (393×913) — cancel subscription
- Raster `61:6784` — artist profile with Follow / Subscribe / Message (overlay `61:6786`)

**Creator path**
- `63:12717` (404×841) — "This month": 245 €, bar chart, Subscriptions 110 € / One-time gifts 135 €
- `63:12763` (366×780) — Select period (Today / This week / This month / Last month / This year / Custom + calendar)
- `63:12837` (366×780) — Subscribers list (All / Active / Cancelled)
- `63:12879` (366×780) — One-time gifts list (Recent / Highest)
- Raster `63:12515` — Donations dashboard

**Annotations:** `42:35837` Subscribe · `42:35841` Unsubcribe · `61:10607` "Period" · `61:10610` "One time" · `61:10612` "Note: Just for recurring subscription" · `63:12512`, `63:12756`, `63:12760`, `63:12835`, `63:12920`

**Open questions** — **No checkout step exists anywhere.** Card entry, payment provider, and any receipt/confirmation for one-time gifts are all undesigned. Given Institution onboarding connects Stripe, Stripe is the likely provider, but the payer-side flow is a hole.

---

## Community (`80:6836`)

Groups. Two labelled swimlanes: `80:6855` "Creator" and `80:6859` "Participant". Every frame is literally named "Frame" — labels below come from their text content.

**Creator**
- `80:6863` (366×780) — Groups list: search, All / My request / My groups tabs
- `80:7388` (366×488) — group options sheet: Edit group info / Delete group
- `80:7446` (366×844) — Edit Group: cover photo, name, description, style, privacy (Private/Public)
- `80:7428` (366×500) — "Delete 'String Quartet Lyon'?"
- `82:7857` (366×844) — New Group, step 1 of 3 · STYLE
- `82:7906` (366×700) — New Group, step 2 of 3 · LOCATION
- `82:7937` (366×900) — New Group, step 3 of 3 · WHEN
- `80:7191` (366×844) — My Groups: Created / Joined tabs, pending-request badges
- `80:7233` (366×780) — Join requests: Approve / Reject rows
- Raster: `82:7991` (view group details), `82:7994` (bandmates sub-flow)

**Participant**
- `80:7501` (366×780) — Groups list
- `80:6910` (366×844) — Group detail, "Request to join" CTA
- `80:6993` (366×844) — Request-to-join form: optional message + Send request
- `80:7073` (366×780) — Groups list, "Requested" state
- `80:7039` (366×780) — My requests: PENDING / DECLINED + Cancel
- `80:7126` (366×500) — "Cancel your request?"

**"Looking for bandmates" sub-flow** — image only, inside raster `82:7994`. Four screens: Create post step 1/2 (basic info), step 2/2 (skill level, availability, practice frequency, headcount → Publish / Save as draft), browse list, post details. Chips `82:7997`, `141:6664`.

**Open questions**
- An "Approve/Reject request" chip sits at x≈1263 with an arrow pointing at nothing — the post-approval state screen is missing.
- No layer naming convention at all.

---

## Instrument / venue rental (`141:6666`)

The rental marketplace: listing management for owners, discovery/booking/payment for renters, request handling, reviews. **Only 2 of 112 children are real frames.**

**Real**
- `150:6732` (366×500) — "Delete this rental listing?"
- `150:6752` (366×500) — "Unable to delete listing — this listing has active bookings and cannot be deleted"

**Raster:** `141:6677`, `142:6693`, `172:7079`, `172:7082`, `172:7085`, `172:7088`, `172:7091`, `204:7148`, `214:7157`, `214:7160`, `214:7163`, `214:7172`, `214:7175`, `307:6654`, `307:6657`, `307:6660`, `328:6717`, `328:6720`, `438:8542`, `455:8715`, `455:8717`, `455:8732`, `455:8740`, `455:8748`, `455:8802`, `659:8208`

**Flow, reconstructed from annotation chips**

*Owner — listing:* Create instrument rental `82:8000` → View my listings `150:6700` → Edit instrument info `150:6725` → Delete instrument `150:6729`. Conditionals `150:6751` ("If there is no active, upcoming (deposit paid) booking…") and `150:6767` ("If there is an active/upcoming booking…") gate the two delete dialogs. Hint `447:8490`: "Upload photos of your instrument and, if applicable, the venue where it is available."

*Renter — booking:* Browse listings `172:7103` → Set filter `172:7111` → Listing details `172:7115` → Owner profile `172:7119` → Request booking `172:7124` → Review and send `172:7129` → **chat auto-created** `455:8737` → owner accepts `455:8770` → **pay deposit** `455:8745` → confirmation email `455:8785` → status updated in chat `455:8754` → **contact details unlock** `307:6708` → balance reminder email `455:8790` → **complete full payment** `455:8791`. Note `455:8806`: "The status will be updated as the booking progresses. This is just a reference UI to illustrate the layout." Note `455:8778`: "User clicks to the booking."

*Owner — requests:* View requests `214:7154` → Accept `214:7168` / Decline `214:7178`
*After:* Leave review `307:6712`. Block `659:8210` is labelled "Reference flow" — external material, not a Museeve screen.

**Open questions** — **Highest-risk area in the build.** A two-stage payment (deposit then balance), transactional emails, a booking status machine, and a contact-unlock rule all exist only as text written over screenshots. Nothing here is implementable from layers.

---

## Music partner finder (`350:7682`)

Musician-to-musician discovery plus a full collaboration-invitation lifecycle.

**Real**
- `683:8234` (390×866) — Home: top nav (avatar, search, 2 icon buttons; hidden container `683:8238`), genre filter row, "Artist stories" row, post cards, bottom nav `683:8282`

**Raster:** `683:8232` (tall home-feed render), `687:8781` (discover / filter / map cluster — 4 screens), `687:8778` (the 10-step invitation board)

**Chips:** `683:8763` Discover – Music partners → `683:8766` Advanced filter → `683:8771` See nearby musicians → `687:8790` Send/receive invitation flow

**Flow:** Home feed → Discover partners (results list: rating, level, "Looking for", Chat / View profile) → Advanced filter sheet (location, instrument, skill level, age, gender, availability) → List/Map toggle with map-pin result card. From a chat, the invitation flow runs ten numbered steps: 1 Chat → 2 Invite to collaborate (project title, instrument, date, time, location, notes) → 3 Request sent (pending card in chat) → 4 Request received (Accept / Decline) → 5 Accepted ("Collaboration confirmed") → 6 Edit or cancel before accept → 7 Declined → 8 Upcoming collaboration (My Collaborations · Upcoming) → 9 Completed (Past tab, "Leave review") → 10 Leave review (stars, tags, free text, Submit).

**Open questions** — Is "My Collaborations" a new top-level destination or nested under Profile? Bottom nav in the real frame disagrees with the raster screens (see cross-cutting finding 3).

---

## Email sign up (`4:2`)

A Figma **section**, fully built with real layers — the cleanest area in the file.

- `3:11` — a1-sign-in (390×844): logo, Sign in / Sign up tabs, email + password, forgot-pw link, CTA, "or" divider, social circles, "Continue as guest" (`39:34591`, variant `guest-button/pressed`)
- `3:107` — a3-otp (390×844): 6-digit OTP with active caret, timer, "change email"
- `3:143` — a4-verified (390×844): success + CTA

Stray non-screen children: `4:2072` (empty frame), `4:2073` / `4:2074` (floating `social-button` instances).

**Flow:** a1-sign-in → a3-otp → a4-verified. Forgot-pw hands off to `Forget psw`; social circles to `Social sign up`; guest to `Guest mode`.

**Open question** — **There is no `a2-*`.** The happy-path sign-up form is missing from this area; the only full sign-up form in the entire file is `3:668` "sign up error" over in `Forget psw`.

---

## Social sign up (`8:41`)

OAuth provider sheets over the auth screen, plus an error state. All real layers.

- `3:162` — GG sign up (390×844): underlay + overlay + Google account picker (`3:204`)
- `3:232` — Apple sign up (390×844): underlay + overlay + Apple sheet (`3:260`) with "hide my email" checkbox (`3:279`)
- `3:323` — error (390×844): title/subtitle, primary CTA, ghost button, forgot-pw link

**Open questions** — Facebook has a circle (`3:201`) but no sheet. Is Facebook in scope? Which provider does `3:323` belong to?

---

## Forget psw (`9:55`)

Password recovery **plus** a catch-all bucket of auth error and loading states that belong to other screens. All real layers.

- `3:478` — Forgot psw: email input, send CTA, back-to-login
- `3:511` — recovery code: 6-digit OTP + resend timer
- `3:550` — set new psw: password field, 4-bar strength meter, rule checklist ("At least 8 characters", "Upper and lower case letters", "At least 1 number", "Different from the old password")
- `3:603` — psw updated
- `3:626` — log in error
- `3:668` — sign up error: full sign-up form (name, email + error hint, password + strength bars, confirm password + error hint)
- `3:718` — otp error
- `3:758` — loading (spinner in CTA)

Stray: `9:42`, `9:43` (`social-button` instances).

**Open question** — the last four are state variants of `3:11` / `3:107` parked in the wrong place; they should be re-homed as component variants.

---

## Guest mode (`172:7070`)

**Not screens — one flattened reference image** (`172:7068`, 1536×1024). Depicts seven wireframes with no node ids of their own:

1. Sign In — "Continue as guest" / "Browse without an account"
2. Home Feed (guest) — dismissible "You're browsing as a guest" banner, search, Upcoming Events, Recent Posts, Looking for Bandmates
3. Group Detail (guest) — Join Group CTA
4. Login Required (modal / bottom sheet) — lock icon, "Sign in required", Sign in / Sign up / Continue browsing
5. Event Detail (guest) — Join Event CTA
6. Musician Profile (guest) — Follow / Message
7. Login Required (reusable) — full-screen version of the gate

**Permission matrix, stated in the image:**
- **Guest can:** browse home, view events, view groups, view profiles, view posts, search
- **Guest cannot:** create post, join group, join event, like/comment, follow/message, upload story, edit profile

**Open question** — nothing implementable; rebuild as layers or treat as written spec. Its bottom nav matches no other area.
