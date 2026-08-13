// Values Tailwind classes can't express, verbatim from Figma.
// Token source: project/brief/figma-intake.md §4 · Login context node 468:27410.
export const colors = {
  primary: '#8b1c1c',
  primaryFaded: '#1c0606',
  primaryOn: '#f7d8d8',
  ground: '#141414',
  surface: '#171717',
  elevated: '#454545',
  fg: '#e7e7e7',
  fgStrong: '#ffffff',
  fgMuted: '#888888',
  // Figma: #5d5d5d — fails WCAG AA on ground; lifted (see project/STATE.md)
  fgPlaceholder: '#8a8a8a',
  line: '#262626',
  lineFaded: '#5d5d5d',
  danger: '#e11d48',
  success: '#17b26a',
  stripe: '#635bff',
  guestLink: '#ff4545', // Login 468:27410 "Log in as Guest"
  legal: '#b1b1b1', // Login legal footer
} as const;

// CTA gradient, Login node 495:17972: linear to top, 2px border #cd4141
export const ctaGradient = {
  colors: ['rgba(133,35,35,0.8)', 'rgba(182,44,44,0.8)'] as const,
  border: '#cd4141',
} as const;

// Social button fill, nodes 468:27868/27874/27876
export const socialButtonFill = 'rgba(194,144,144,0.2)';

export const fonts = {
  display: 'BeautiqueDisplay-Bold',
  displayItalic: 'BeautiqueDisplay-BoldItalic',
  sansLight: 'DMSans9pt-Light',
  sans: 'DMSans9pt-Regular',
  sansMedium: 'DMSans9pt-Medium',
  sansSemiBold: 'DMSans9pt-SemiBold',
} as const;
