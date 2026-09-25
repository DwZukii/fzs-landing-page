import { track } from '../../lib/tracking.js';
import { whatsappUrl } from '../../lib/whatsapp.js';

// Every WhatsApp link goes through here so the Pixel `Contact` event always fires.
export default function WhatsAppLink({ message, onClick, children, ...props }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        track('Contact');
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
