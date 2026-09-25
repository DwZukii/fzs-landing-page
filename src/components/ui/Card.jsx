export default function Card({ as: Tag = 'div', className = '', ...props }) {
  return (
    <Tag className={`rounded-card border border-slate-200 bg-white p-6 shadow-card md:p-7 ${className}`} {...props} />
  );
}
