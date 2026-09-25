// Light section: vertical rhythm + centred content column.
export function Container({ className = '', ...props }) {
  return <div className={`mx-auto w-full max-w-content px-5 md:px-8 ${className}`} {...props} />;
}

export function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`mb-3 font-heading text-small font-semibold uppercase tracking-[0.12em] ${
        dark ? 'text-gold-400' : 'text-slate-600'
      }`}
    >
      {children}
    </p>
  );
}

export function H2({ children, dark = false, className = '', ...props }) {
  return (
    <h2
      className={`font-heading text-h2 font-semibold md:text-h2-lg ${dark ? 'text-white' : 'text-slate-900'} ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export default function Section({ id, tone = 'sand', className = '', children, ...props }) {
  const bg = tone === 'alt' ? 'bg-sand-100' : tone === 'tint' ? 'bg-navy-50' : '';
  return (
    <section id={id} className={`scroll-mt-20 py-14 md:py-24 ${bg} ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
