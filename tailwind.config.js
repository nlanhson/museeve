/** @type {import('tailwindcss').Config} */
// Every value below is transcribed from the Figma file's `var(--…)` token set
// (project/brief/figma-intake.md §4). Do not invent values; extend from Figma.
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      transparent: 'transparent',
      // brand
      primary: {
        DEFAULT: '#8b1c1c', // --primary-solid-500 / --bg_primary_normal
        faded: '#1c0606', // --bg_primary_faded
        on: '#f7d8d8', // --fg_primary_on-background
      },
      // surfaces
      ground: '#141414', // --gray-true-900
      surface: '#171717', // bg/secondary/default
      elevated: '#454545', // --bg_elevation_level-2_normal
      // text
      fg: {
        DEFAULT: '#e7e7e7', // --fg_neutral_normal
        strong: '#ffffff', // --fg_neutral_on-background
        muted: '#888888', // --fg_neutral_faded
        // Figma uses #5d5d5d (2.6:1 on ground — fails WCAG AA). Lifted to the
        // nearest passing grey; recorded as a deviation in project/STATE.md.
        placeholder: '#8a8a8a',
        reverse: '#161616', // --fg_neutral_reverse
      },
      // borders
      line: {
        DEFAULT: '#262626', // stroke/primary/default
        faded: '#5d5d5d', // --bd_neutral_faded (non-text use only)
        hover: '#ffffff', // --bd_neutral_normal-hover
      },
      // status
      danger: '#e11d48', // --fg_danger_normal
      error: '#d92d20', // Colors/Error/600
      success: '#17b26a', // text/primary/success
      // Stripe screens only (621:15026, 621:18926)
      stripe: '#635bff',
    },
    spacing: {
      // --space-horizontal-* : none/2xs/xs/ns/sm/nm/md/lg/xl/2xl/3xl
      0: '0px',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      8: '32px',
    },
    borderRadius: {
      // --border-radius-* : none/xs/md/3xl/round (+ radius-12 from components)
      none: '0px',
      xs: '2px',
      md: '8px',
      lg: '12px',
      '3xl': '32px',
      full: '999px',
    },
    borderWidth: {
      // --border-weight-* : xs/sm/md
      hairline: '0.5px',
      DEFAULT: '1px',
      md: '1.5px',
    },
    fontSize: {
      // --font-scale-* with matched --line-height-*
      '2xs': ['10px', { lineHeight: '14px', letterSpacing: '1px' }], // Caption/10
      xs: ['12px', { lineHeight: '18px' }], // Body 12
      sm: ['14px', { lineHeight: '20px' }], // Body 14
      md: ['16px', { lineHeight: '24px' }], // Body 16 / Button 16
      '4xl': ['40px', { lineHeight: '52px', letterSpacing: '-1px' }], // Title 3
      '6xl': ['52px', { lineHeight: '64px', letterSpacing: '-1px' }], // Title 1
    },
    fontFamily: {
      // --font-family_primary: DM Sans (UI); --font-family_mono: Beautique Display (display serif)
      // iOS registers by PostScript name: the DM Sans statics are DMSans9pt-*.
      // `sans` is reserved by Nativewind (rewritten to the platform stack), so
      // the regular weight is exposed as `font-body`.
      body: ['DMSans9pt-Regular'],
      'sans-light': ['DMSans9pt-Light'],
      'sans-medium': ['DMSans9pt-Medium'],
      'sans-semibold': ['DMSans9pt-SemiBold'],
      display: ['BeautiqueDisplay-Bold'],
      'display-italic': ['BeautiqueDisplay-BoldItalic'],
    },
    extend: {},
  },
  plugins: [],
};
