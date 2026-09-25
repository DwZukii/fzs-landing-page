const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold transition-colors select-none disabled:cursor-not-allowed disabled:opacity-50';

const variants = {
  primary: 'bg-gold-500 text-navy-900 hover:bg-gold-400 active:bg-gold-600',
  outlineLight: 'border-2 border-white/80 text-white hover:bg-white hover:text-navy-900',
  outlineDark: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white',
  whatsapp: 'bg-positive text-white hover:bg-[#0f7650]',
};

const sizes = {
  sm: 'px-4 py-2 text-small',
  md: 'px-6 py-3 text-body md:text-body-lg',
  lg: 'px-5 py-4 text-body-lg sm:px-7',
};

export default function Button({ as: Tag = 'button', variant = 'primary', size = 'md', className = '', ...props }) {
  const extra = Tag === 'button' && !props.type ? { type: 'button' } : {};
  return <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...extra} {...props} />;
}
