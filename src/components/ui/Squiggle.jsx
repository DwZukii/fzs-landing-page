// Decorative hand-drawn accents. Always aria-hidden, never interactive, hidden below md.
const shapes = {
  squiggle: (
    <path
      d="M4 22c8-14 16-14 22 0s14 14 22 0 16-14 22 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  ),
  burst: (
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
      <path d="M37 6v12M37 56v12M6 37h12M56 37h12M15 15l8 8M51 51l8 8M59 15l-8 8M23 51l-8 8" />
    </g>
  ),
  dots: (
    <g fill="currentColor">
      <circle cx="8" cy="8" r="4" />
      <circle cx="30" cy="8" r="4" />
      <circle cx="52" cy="8" r="4" />
      <circle cx="19" cy="28" r="4" />
      <circle cx="41" cy="28" r="4" />
    </g>
  ),
  loop: (
    <path
      d="M6 40c10-30 44-34 40-8-3 18-28 14-22-2 6-17 34-18 42 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  ),
};

const viewBoxes = { squiggle: '0 0 74 44', burst: '0 0 74 74', dots: '0 0 60 36', loop: '0 0 74 60' };

// `from` is the breakpoint the accent appears at. Accents anchored to an
// element that only takes its final position at lg (the hero photo) need
// 'lg', or they drift off on their own between md and lg. 'xl' is for accents
// that sit outside the photo and only have room beside it from 1280px.
const appearsAt = { md: 'md:block', lg: 'lg:block', xl: 'xl:block' };

export default function Squiggle({ shape = 'squiggle', from = 'md', className = '' }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={viewBoxes[shape]}
      className={`pointer-events-none absolute hidden text-gold-500 ${appearsAt[from]} ${className}`}
    >
      {shapes[shape]}
    </svg>
  );
}
