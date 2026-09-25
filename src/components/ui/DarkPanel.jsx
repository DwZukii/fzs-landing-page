// Signature pattern: full-width navy panel, 28px radius, inset 16px from the
// viewport edge so the sand page background shows around it.
export default function DarkPanel({ id, as: Tag = 'section', className = '', innerClassName = '', children, ...props }) {
  return (
    <Tag id={id} className={`scroll-mt-20 px-4 ${className}`} {...props}>
      <div className={`relative overflow-hidden rounded-panel bg-navy-900 text-white ${innerClassName}`}>
        {children}
      </div>
    </Tag>
  );
}
