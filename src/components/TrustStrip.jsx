import { useLanguage } from '../i18n/LanguageContext.jsx';
import Icon from './ui/Icon.jsx';

export default function TrustStrip() {
  const { t } = useLanguage();
  const items = [
    { icon: 'shield', label: t('trust.noFee') },
    { icon: 'badge', label: t('trust.ssm') },
    { icon: 'person', label: t('trust.human') },
  ];
  return (
    <ul className="grid divide-y divide-navy-700 border-t border-navy-700 md:grid-cols-3 md:divide-x md:divide-y-0">
      {items.map((item) => (
        <li key={item.icon} className="flex items-center gap-3 px-6 py-4 md:justify-center md:px-6 md:py-6">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-800 text-gold-500">
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <span className="text-small font-medium text-white md:text-[14px]">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
