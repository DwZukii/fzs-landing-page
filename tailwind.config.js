/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A1F3D', // hero + dark panel background, footer
          800: '#12305C', // dark panel secondary surface, hover on navy
          700: '#1B4079', // borders and dividers inside dark panels
          50: '#EEF3FA', // tint background for subtle light sections
        },
        gold: {
          600: '#D98A0B', // CTA pressed state
          500: '#F5A524', // PRIMARY CTA fill, accent squiggles, numbered circles
          400: '#FFBF47', // CTA hover
          100: '#FFF3DC', // soft highlight background, calculator result panel
        },
        sand: {
          50: '#FBF8F3', // default page background (NOT pure white)
          100: '#F3EDE3', // alternate light section background
        },
        slate: {
          900: '#16202E', // headings on light backgrounds
          600: '#5A6B84', // body text on light backgrounds
          300: '#C3CDDB', // muted text on dark backgrounds
          200: '#E4E9F0', // borders on light backgrounds
        },
        positive: '#128A5E', // checkmarks, eligible state
        warn: '#C8442E', // ineligible state, scam warning accents
        whatsapp: '#25D366', // floating WhatsApp button only
      },
      fontFamily: {
        // DM Sans, self-hosted via @fontsource-variable/dm-sans (imported in
        // main.jsx). One variable file covers every weight we use.
        heading: ['"DM Sans Variable"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans Variable"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Unsuffixed sizes are the mobile sizes; `-lg` variants take over at md.
        h1: ['28px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h1-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        h2: ['22px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h2-lg': ['38px', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h3: ['17px', { lineHeight: '1.3' }],
        'h3-lg': ['22px', { lineHeight: '1.3' }],
        body: ['14px', { lineHeight: '1.6' }],
        'body-lg': ['16px', { lineHeight: '1.65' }],
        small: ['13px', { lineHeight: '1.5' }],
      },
      maxWidth: {
        // Text/content column. Everything readable lines up to this.
        content: '1140px',
        // Content column *inside* a DarkPanel. The panel is inset 16px from
        // each viewport edge, so a column 32px narrower with 16px less padding
        // (PanelContainer: md:px-8 vs Container's md:px-12) puts panel content
        // on exactly the same left/right edges as the light sections and the
        // header, at every width. Using max-w-content in a panel shifted its
        // content 16px in at narrow widths and broke the page's vertical line.
        inset: '1108px',
        // Outer shell for the full-bleed navy panels. Without a cap they keep
        // growing on wide monitors while the content column stays at 1140,
        // which leaves the content marooned in the middle of a huge panel.
        shell: '1400px',
      },
      borderRadius: {
        panel: '28px',
        card: '16px',
        input: '12px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,31,61,.04), 0 8px 24px rgba(10,31,61,.06)',
        header: '0 1px 0 rgba(10,31,61,.06)',
      },
      transitionDuration: {
        DEFAULT: '180ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
      },
    },
  },
  plugins: [],
};
