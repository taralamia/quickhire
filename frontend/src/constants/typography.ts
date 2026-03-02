export const TYPOGRAPHY = {
  fonts: {
    heading: "'Clash Display', sans-serif",
    body: "'Epilogue', sans-serif",
    logo: "'Red Hat Display', sans-serif",
  },
  sizes: {
    h1: { size: '72px', lineHeight: '110%' },
    h2: { size: '48px', lineHeight: '110%' },
    bodyLarge: { size: '18px', lineHeight: '160%' },
    bodyNormal: { size: '16px', lineHeight: '160%' },
    bodySmall: { size: '14px', lineHeight: '160%' },
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;
