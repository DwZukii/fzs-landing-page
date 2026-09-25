export const WHATSAPP_NUMBER = '601156995478';
export const WHATSAPP_DISPLAY = '011-5699 5478';
export const SSM_NUMBER = '202303129497';

export function whatsappUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
