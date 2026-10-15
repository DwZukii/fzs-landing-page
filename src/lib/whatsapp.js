export const WHATSAPP_NUMBER = '60123795478';
export const WHATSAPP_DISPLAY = '012-379 5478';
export const SSM_NUMBER = '202303129497';

export function whatsappUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
