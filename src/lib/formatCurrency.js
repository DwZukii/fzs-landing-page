const nf = new Intl.NumberFormat('en-MY', { maximumFractionDigits: 0 });

export function formatRM(n) {
  return 'RM ' + nf.format(n);
}

// For inputs: keeps digits only and inserts thousand separators as the user types.
export function formatDigitsInput(raw, maxDigits = 7) {
  const digits = String(raw).replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, maxDigits);
  return digits ? nf.format(Number(digits)) : '';
}

export function parseDigits(formatted) {
  const digits = String(formatted).replace(/\D/g, '');
  return digits ? Number(digits) : NaN;
}
