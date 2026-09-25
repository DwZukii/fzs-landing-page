import { useLanguage } from '../i18n/LanguageContext.jsx';
import Icon from './ui/Icon.jsx';

export default function TrustStrip() {
  const { t } = useLanguage();
  const items = [
    { icon: 'shield', label: t('trust.noFee') },
    { icon: 'person', label: t('trust.human') },
  ];
  // The divider spans the whole panel, but the items stay inside the content
  // column so they line up with the hero above instead of drifting apart to
  // the panel edges on a wide monitor. Two items fit side by side even at
  // 360px, which saves a full row of height on mobile.
  return (
    <div className="border-t border-navy-700">
      <ul className="mx-auto grid max-w-content grid-cols-2 divide-x divide-navy-700 md:px-6">
        {items.map((item) => (
          <li
            key={item.icon}
            className="flex items-center gap-2 px-4 py-3.5 sm:gap-3 sm:px-5 md:justify-center md:px-6 md:py-6"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-800 text-gold-500 sm:h-9 sm:w-9">
              <Icon name={item.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="text-[12px] font-medium leading-snug text-white sm:text-small md:text-[14px]">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
