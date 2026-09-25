// TODO: replace with the real logo file once supplied by the client.
// "FZS" sits in a navy chip so the gold never appears as text on a light background.
// `compact` drops the "SUCCESS" word below 480px, where the header cannot fit
// the full wordmark, the language toggle and the CTA side by side. The chip
// alone still reads as the brand, and the header link carries the full name in
// its aria-label.
export default function Wordmark({ dark = false, compact = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-heading font-bold tracking-tight ${className}`}>
      <span className={`rounded-md px-1.5 py-0.5 text-gold-500 ${dark ? 'bg-navy-800' : 'bg-navy-900'}`}>FZS</span>
      <span className={`${dark ? 'text-white' : 'text-navy-900'} ${compact ? 'hidden min-[480px]:inline' : ''}`}>
        SUCCESS
      </span>
    </span>
  );
}
