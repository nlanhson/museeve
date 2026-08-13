# Screen inventory — `Main Design` (in scope)

**Source:** [`-ME- wireframe`](https://www.figma.com/design/8eSSaL6bKgsphXKKTXGUtx/-ME--wireframe) · section `468:30959`
**Read on:** 2026-08-10 · read-only
**Purpose:** the build spec. Every string below is transcribed verbatim from the design — use these, do not paraphrase.

Companion docs: `figma-intake.md` (scope and tokens) · `figma-feature-areas.md` (out of scope, background only).

---

## Authentication

### Splash — `468:29282`
Brand lockup only: monogram, `Music` (bold serif) over `Everywhere` (italic serif), vertically centred. No controls. Full-bleed crimson satin photograph with film grain, brightest top-centre.

### Login — `468:27410`
- Field label `Email`, placeholder `Enter your email` — underline-only field, label sits above and outside
- Primary button `Explore now` — crimson pill, hugs its content, centred
- Divider `Or` with hairline rules either side
- Three circular social buttons: Google, Apple, Facebook — translucent dark fill over the photo
- Text link `Log in as Guest` — crimson bold, centred
- Legal footer: `By continuing, you agree to the` / `Terms of Use and the Privacy Policy.` with both names as tappable spans

Static viewport, no scroll.

### Sign in with Apple — `468:29835`
The **native iOS system sheet**, not a custom component. Comes from `expo-apple-authentication`; do not rebuild. Sheet copy for reference: `Sign in with Apple`, `Create an account for Music Everywhere using your Apple Account your.name@mail.com`, rows `Name` / `Share My Email` / `Hide My Email` (Hide selected by default), button `Continue`.

### OTP verify — `468:27887`
- Heading `Verify your email`
- Helper `6-digit code sent to`, then `your.name@example.com` in crimson with a trailing pencil edit icon
- 6-cell OTP. Cells are rounded rectangles (~14px radius) with a dark maroon-black fill. Filled cells show a large white digit (`4` `2` `8`); the active cell shows a tall caret and no digit; remaining cells empty
- Resend row: grey `Didn't receive?` + crimson `Resend in 54s`
- Primary button `Verify Code` — **disabled** (muted mauve-grey fill, mid-grey label), correct since the code is incomplete
- Same legal footer as Login
- Back arrow top-left

### OTP verify, keyboard open — `468:28807`
Same logical state as `468:27887`; only the keyboard differs. Content column translates up ~40px. The legal footer sits **behind** the keyboard, so it must live inside the keyboard-avoiding container rather than be absolutely pinned. Keyboard is `number-pad`, light appearance. **The back arrow is absent on this frame** — see design bugs.

### Welcome — `550:31514`
- `Welcome to` / `Music Everywhere` (`Music` bold serif, `Everywhere` italic serif)
- Body: `Connect with musicians, fans & institutions.` / `Discover events, buy instruments, find bandmates` / `and grow your musical career.`
- One control: a crimson circular button with a lighter ring and a white double-chevron-up glyph, bottom-centred. Reads as swipe-up-to-continue as well as tappable
- Hero: ~18 iridescent soap-bubble photo circles overflowing the top and side edges, rendering over the status bar. Ship as composited imagery, not as tintable components

---

## Onboarding

### Your account type — `709:10967`
- Heading `Your account type`
- Subtitle `Choose your account type.` / `You can switch later (30-day cooldown)`
- Horizontal paged carousel of three cards; neighbours peek at both edges, dimmed and inset
- 3-dot pagination, active dot crimson
- Primary button `Confirm` — crimson pill, **full width** with side margins (wider than the hugging pills elsewhere)
- The only screen in the set that draws a home indicator

**Card anatomy:** photo-collage mosaic across the top ~52%, dark gradient scrim, serif title with a long arrow rule running to the card's right edge, intro line, bulleted list.

**Artist** — `709:11230` · intro `For musicians, singers, DJs, Music Writers,...`
- `As an Amateurs, Students, Teachers or professionals`
- `Share your works to build a worldwide audience`
- `Find other artists and collaborate to create music`
- `Rent equipments, Teach, Create masterclass`
- `Gain visibility in the music industry`

**Fan** — `709:11299` · intro `For music lovers`
- `Discover artists and stay updated on upcoming concerts, festivals,...`
- `Explore global music news in real-time, learn about diverse musical styles, and support your favorite artists`
- `Take music lessons, find teachers, attend masterclasses and rent equipments.`

**Institution** — `709:11379` · intro `For businesses and organizations in the music industry.`
- `Management & Production` · `Events and Concerts` · `Stores and Equipment` · `Education and Training` · `Others`

Card height must flex: Artist and Institution carry 5 bullets, Fan carries 3.

---

## Phone verification — shared by all three account types

`545:29011` (Fan) · `720:20073` (Artist) · `709:15118` (Institution)

The Fan and Artist frames are **pixel-identical**. The Institution frame differs only in its step indicator.

- Heading `Phone verification`
- Subtitle `We'll send a one-time code to verify your number. Standard rates may apply.`
- Field `Phone number` — compound control: 🇫🇷 flag + `+33` + chevron, thin vertical divider, numeric input with placeholder `6 12 34 56 78`, one shared bottom hairline under both parts
- Privacy note with a green shield-check icon: `Your phone number is only used for verification. It's never shared with other users or third parties.`
- `Skip` — ghost text button, bottom-left
- `Next` — filled pill, **disabled**, bottom-right, takes the remaining width

Step indicator: `Step 1/2` for Fan and Artist (2 segments), `Step 1/3` for Institution (3 segments).

Background: near-black with a subtle diagonal halftone texture and a soft radial vignette top-left.

## Enter the code — shared by all three

`720:19453` (Fan) · `720:20111` (Artist) · `709:15156` (Institution)

Fan and Artist are pixel-identical; Institution differs only in the step indicator.

- Heading `Enter the code`
- `6-digit code sent to` then `+33 6 12 34 56 78` in crimson with a pencil edit icon
- 6-cell OTP, same treatment as the auth OTP
- `Didn't receive?` + `Resend in 54s`
- **No primary CTA** — auto-advances on the sixth digit

---

## Fan setup

### Create your profile — `720:19575` (empty) / `720:19771` (filled)

| # | Label | Placeholder | Type | Required |
|---|---|---|---|---|
| 0 | — | — | circular avatar upload with camera badge | no |
| 1 | `User name` | `Enter user name` | text | **yes** (red asterisk) |
| 2 | `Your favourite genres` | `Select` | multi-select → chips | no |
| 3 | `Your interested areas` | `Select` | multi-select → chips | no |
| 4 | `Bio` | `Describe about yourself` | textarea | no |

CTA `Explore now` — disabled grey when empty, crimson when valid.

Filled-state values: `Daniel Nguyen`; genre chips `Classical`, `Pop`; area chips `Olivia`, `Mary`; bio `Roger o'nine black shot man guns rig chandler. Lateen coast brethren cat mutiny halter. Gold plate aye cup yarr jolly jolly bow chains me.` The bio's last line fades out under a gradient mask.

Chips render **inside** the field row, left of the chevron; each is a dark pill with a label and an `×`.

### Your profile is ready — `545:28983`
`Your profile` / `Is ready` (italic). No controls — a celebratory transition that auto-advances. Full-bleed maroon gradient with a soft light bloom, serif monogram, a thin elliptical orbit line with a treble clef and beamed eighth notes.

---

## Artist setup

### Setup your profile — `720:20210` (empty, 1082 tall) / `720:20741` (filled, 1221 tall)

Both exceed the 874 viewport, so this form **scrolls**.

| # | Label | Placeholder | Type | Required |
|---|---|---|---|---|
| 0 | — | — | avatar upload | no |
| 1 | `User name` | `Enter user name` | text | **yes** |
| 2 | `Your profession` | `Select` | multi-select → chips | **yes** |
| 3 | `Your genres` | `Select` | multi-select → chips | no |
| 4 | `Your level` | `Select` | single select | no |
| 5 | `Your area` | `Select` | multi-select → chips | no |
| 6 | `Bio` | — | textarea | no |
| 7 | honour declaration | — | checkbox | **gates the CTA** |

Declaration copy: `I declare, on my honor, that:` (italic) followed by
- `I am an artist or actively involved in music.`
- `The information provided in my profile is accurate and truthful.`
- `I understand that providing false information may result in account restrictions or removal.`

Filled values: `Daniel Nguyen`; profession `Teacher`, `Guitarist`; genres `Classical`, `Pop`; level `Professional`; area `Southeast Asia`.

**`Explore now` stays disabled while the checkbox is unchecked, even with every field filled.** That gating relationship is the point of the screen.

### Your profile is ready — `545:28997`
Pixel-identical to the Fan version `545:28983`.

### Fan vs Artist — the exact diff
Artist **adds** `Your profession` (required), `Your level`, and the honour-declaration checkbox; **renames** `Your favourite genres` → `Your genres` and `Your interested areas` → `Your area`; and changes the title from `Create your profile` to `Setup your profile`. Everything else is shared.

---

## Institution setup

### Setup your profile — `545:33033` (empty) / `545:33155` (filled)

| # | Label | Placeholder | Type | Required |
|---|---|---|---|---|
| 0 | — | — | logo upload with camera badge | no |
| 1 | `Organization name` | `Enter your organization name` | text | **yes** |
| 2 | `Type of Institution` | `Select type of institution` | single select | **yes** |
| 3 | `Your area` | `Select your area` | multi-select → chips | **yes** on the empty frame only |
| 4 | `Your website link` | `Enter your website link` | text (URL) | no |

CTA `Continue` — differs from the Fan/Artist `Explore now` because Institution has a third step. Filled values: `Calie`, `Event Organizer`, area `Southeast Asia`, website left empty with the CTA still enabled, confirming it is genuinely optional.

### Upload supporting documents — `550:37118` (idle) · `720:21640` (source picker) · `621:12857` (uploaded)

- Heading `Upload supporting documents` (wraps to two lines)
- Subtitle, italic: `Please provide any documents that can justify your legal status or activity.`
- `Learn more` — crimson text link with a trailing circled `?`
- Upload card: rounded container, leading document icon, italic status text, trailing crimson `Upload` action

**Idle** — status reads `No file uploaded`. No primary CTA is shown.

**Source picker** — a **centred modal card**, not a bottom sheet; frosted light grey, the only light surface in the whole onboarding flow. Title `How would you like to upload?`, then two full-width grey buttons `Choose from Files` and `Choose from Drive`. No cancel button is drawn — dismissal is tap-outside. The screen behind is not dimmed in this render.

**Uploaded** — status reads `3 files uploaded`, then three rows, each: file glyph with a red format badge, `Document.pdf`, and a status line of green circled check + green `Uploaded` + grey `• 200 KB`, separated by hairlines. No per-row delete or retry affordance is drawn. CTA `Continue to Verify` appears — crimson filled pill, full width, bottom-pinned.

### Connect with Stripe — `621:15026`
Presented as a **dark bottom sheet**: grab handle, circular `✕` top-left, centred title `Payment Verification`.

- `Connect with Stripe` / `Secure payment & identity verification`
- Body: `Stripe is our trusted partner for secure financial verification. Connecting your account allows us to verify your institution and process future transactions safely.`
- Three benefit rows, each with a violet shield-check icon: `PCI-DSS Level 1 certified security` · `Bank-grade encryption for all data` · `No card charged during verification`
- CTA `Connect Stripe account` — **indigo/violet (Stripe brand), not crimson**, full width, with a trailing external-link icon indicating it opens a browser
- Footnote with a lock icon: `Your financial data is never shared with third parties. By connecting, you agree to Stripe's Terms of Service and our Privacy Policy.` — both names underlined links

No step indicator on this screen.

### Payment verification, connected — `621:18926`
- Title `Payment Verification`, circular `✕` top-left
- Graphic: violet Stripe `S` tile, a green circular link badge, and a dark-crimson Museeve monogram tile, joined by green dashed lines
- `Your account has been connected to Stripe` in green, then `your.name@gmail.com` in grey
- CTA `Continue` — indigo/violet, full width

Success is carried entirely by green text and the green link badge; there is no large checkmark.

---

## Home — `463:16411`

**Top bar** (44px in a 12px-inset row): 44×44 icon button left, `Music Everywhere` wordmark centred as a **single vector path** (export as SVG, not live text), 44×44 icon button right. Both side icons are the SF Symbol `square` — **placeholders; the real icons have not been chosen.**

**Story rail:** horizontal strip 98px tall, items 60×82 at 80px pitch, 7 items with the last two overflowing. First item `Your story` — plain avatar, no ring, white circular `+` badge bottom-right. All others carry a crimson ring (unseen state). Labels are single-line, centred, grey, ellipsis-truncated: `Aubrey_Wiso…`, `Kathryn_Hod…`, `Timmy80`, `Yvonne_Mac`.

**Post card** (390×580):
1. **Header**, 58px — 32px avatar with a double-ellipse story ring, then `Metallica` with a red scalloped verified badge over `Marseille, France`, then a right-aligned 32px `⋯` overflow button. A hidden follow-button instance sits at x=265.
2. **Media**, 390×390 square — full-bleed concert photo. Overlaid near the bottom, inset: a rounded now-playing pill with a circular vinyl thumbnail, `Enter Sandman` over `Metallica • Metal`, and a pause icon on the right, on a dark translucent fill.
3. **Carousel dots** — 5 dots centred; active is an elongated crimson capsule (18×6), the rest 6×6 grey.
4. **Action row** — heart `39`, comment `39`, send `39` as outline icon + count pairs; right-aligned ghost pill with a hand-holding-heart icon (the support/tip affordance).
5. **Caption** — `Exploring a new interpretation of Debussy's Clair de Lune. Recording from tonight's rehearsal.`
6. **Timestamp** — `2h ago`.

**Bottom tab bar** (402×104, floating) — two detached groups: a 282×62 rounded pill holding three equal tabs (tab 1 active with a crimson-tinted pill highlight), and a separate 62×62 circular search button to its right. **Labels literally read `Tab 1`, `Tab 2`, `Tab 3` and the icons are generic squares — placeholders.** Only the search icon is real.

Background is full-bleed dark with a warm crimson radial glow behind the tab bar. The frame is internally named `Login popup`; ignore that.

---

## Design bugs and gaps — raise with the design team

**Apparent bugs**
1. Fan profile screens read `Step 1/2`, but phone verification is also `Step 1/2` in that flow — the profile step should logically be `Step 2/2` (`720:19575`, `720:19771`).
2. `Your area` carries a required asterisk on `545:33033` but not on `545:33155`. One is wrong.
3. The file-type badge reads `CVS` on a file named `Document.pdf` (`621:12857`) — a typo for `CSV`, and wrong for a PDF either way.
4. Fan's `Your interested areas` is populated with person names, `Olivia` and `Mary` (`720:19771`) — stale dummy data.
5. The back arrow is present on `468:27887` but absent on `468:28807`, which is the same logical state with the keyboard open.
6. Disabled CTAs render as narrow centred pills while enabled CTAs render full-width (`545:33033` vs `545:33155`, and the `Explore now` pair). A button must not change geometry when it becomes enabled — pick one.

**Missing states**
7. No error or validation state for any text field.
8. No OTP error state.
9. No enabled, tappable `Resend` state — only the countdown.
10. No loading state on any primary button.
11. No uploading-with-progress and no upload-error state for the document flow. Only idle and done exist.
12. No keyboard-open variant for the Login screen (only for OTP).

**Undecided content**
13. Home top-bar icons and all three tab icons and labels are placeholders. The intended tab names are not in the design.
14. The Stripe screens use indigo CTAs, breaking the crimson palette — intentional brand affordance, or unresolved?
15. Email OTP (auth) and phone OTP (setup) both exist, back to back. Deliberate, or a merge artefact?
