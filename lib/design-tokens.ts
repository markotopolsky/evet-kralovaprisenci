/**
 * Design Tokens
 * 
 * Single source of truth for all design values.
 * These tokens are used throughout the application and should be
 * kept in sync with the CSS custom properties in globals.css.
 */

// =============================================================================
// COLORS
// =============================================================================

export const colors = {
  // Primary brand colors
  primary: {
    DEFAULT: "#3C8C80",
    dark: "#2d6b62",
    light: "#F2F7F5",
    muted: "rgba(60, 140, 128, 0.1)",
    hover: "rgba(60, 140, 128, 0.05)",
  },

  // Accent colors
  accent: {
    DEFAULT: "#E6B84C",
    dark: "#d4a43d",
    light: "rgba(230, 184, 76, 0.2)",
  },

  // Text colors
  text: {
    DEFAULT: "#2A2A2A",
    muted: "#5C5C5C",
    light: "#6b6b6b",
    inverted: "#ffffff",
  },

  // Background colors
  background: {
    DEFAULT: "#ffffff",
    light: "#f8f8f6",
    card: "#ffffff",
    dark: "#2d2d2d",
  },

  // Border colors
  border: {
    DEFAULT: "#e8e6e1",
    light: "#E4E4E4",
  },

  // Status colors
  status: {
    success: "#22c55e",
    successLight: "#86efac",
    error: "#ef4444",
    errorLight: "rgba(239, 68, 68, 0.3)",
    warning: "#eab308",
  },

  // Overlay colors
  overlay: {
    dark: "rgba(0, 0, 0, 0.7)",
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.2)",
  },
} as const;

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  0: "0",
  1: "0.25rem",   // 4px
  2: "0.5rem",    // 8px
  3: "0.75rem",   // 12px
  4: "1rem",      // 16px
  5: "1.25rem",   // 20px
  6: "1.5rem",    // 24px
  8: "2rem",      // 32px
  10: "2.5rem",   // 40px
  12: "3rem",     // 48px
  16: "4rem",     // 64px
  20: "5rem",     // 80px
  24: "6rem",     // 96px
} as const;

// Section padding presets
export const sectionPadding = {
  sm: { y: spacing[12] },           // py-12
  DEFAULT: { y: spacing[16] },      // py-16
  lg: { y: spacing[20] },           // py-20
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  // Font families
  fontFamily: {
    sans: 'var(--font-inter), system-ui, -apple-system, sans-serif',
    heading: 'var(--font-nunito), system-ui, sans-serif',
  },

  // Font sizes
  fontSize: {
    xs: "0.75rem",      // 12px
    sm: "0.875rem",     // 14px
    base: "1rem",       // 16px
    md: "0.9375rem",    // 15px (used in nav)
    lg: "1.125rem",     // 18px
    xl: "1.25rem",      // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
    "4xl": "2.25rem",   // 36px
    "5xl": "3rem",      // 48px
    "6xl": "3.5rem",    // 56px
  },

  // Font weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Line heights
  lineHeight: {
    tight: "1.1",
    snug: "1.25",
    normal: "1.5",
    relaxed: "1.625",
  },
} as const;

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

export const zIndex = {
  dropdown: 50,
  sticky: 50,
  modal: 100,
  tooltip: 110,
  toast: 120,
} as const;

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const borderRadius = {
  none: "0",
  sm: "0.25rem",    // 4px
  DEFAULT: "0.5rem", // 8px
  md: "0.5rem",     // 8px
  lg: "0.75rem",    // 12px
  xl: "1rem",       // 16px
  "2xl": "1.5rem",  // 24px
  "3xl": "2rem",    // 32px
  full: "9999px",
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  none: "none",
  gentle: "0 1px 3px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 4px 12px rgba(0, 0, 0, 0.08)",
  md: "0 4px 6px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.15)",
} as const;

// =============================================================================
// TRANSITIONS
// =============================================================================

export const transitions = {
  fast: "150ms ease",
  DEFAULT: "200ms ease",
  slow: "300ms ease",
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// =============================================================================
// LAYOUT
// =============================================================================

export const layout = {
  maxWidth: {
    container: "80rem",    // 1280px
    content: "48rem",      // 768px
    narrow: "42rem",       // 672px
  },
  navHeight: "72px",
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type ZIndex = typeof zIndex;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Transitions = typeof transitions;
export type Breakpoints = typeof breakpoints;
export type Layout = typeof layout;


