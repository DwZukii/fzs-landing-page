// TODO: replace with the real logo file once supplied by the client.
// "FZS" sits in a navy chip so the gold never appears as text on a light background.
export default function Wordmark({ dark = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-heading font-extrabold tracking-tight ${className}`}>
      <span className={`rounded-md px-1.5 py-0.5 text-gold-500 ${dark ? 'bg-navy-800' : 'bg-navy-900'}`}>FZS</span>
      <span className={dark ? 'text-white' : 'text-navy-900'}>SUCCESS</span>
    </span>
  );
}
