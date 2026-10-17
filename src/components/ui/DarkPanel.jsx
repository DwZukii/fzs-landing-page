// Content column for use inside a DarkPanel. Lines up exactly with the light
// sections' Container and the header at md and up (see `inset` in the Tailwind
// config for the arithmetic). On mobile it keeps its own padding so text never
// sits tight against the panel's rounded edge.
export function PanelContainer({ as: Tag = 'div', className = '', ...props }) {
  return <Tag className={`mx-auto w-full max-w-inset px-5 md:px-8 ${className}`} {...props} />;
}

// Signature pattern: navy panel, 28px radius, inset from the viewport edge so
// the sand page background shows around it. Capped at max-w-shell — past that
// the panel would keep stretching while the content column inside stays at
// 1140px, stranding the content in the middle of an empty navy field.
export default function DarkPanel({ id, as: Tag = 'section', className = '', innerClassName = '', children, ...props }) {
  return (
    <Tag id={id} className={`scroll-mt-20 px-4 ${className}`} {...props}>
      <div
        className={`relative mx-auto w-full max-w-shell overflow-hidden rounded-panel bg-navy-900 text-white ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
