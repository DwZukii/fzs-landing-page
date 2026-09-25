// Accepts 01X-XXX XXXX, 01XXXXXXXX, +601X..., 601X... and returns 60XXXXXXXXX,
// or null when the input is not a Malaysian mobile number.
export function normalisePhone(input) {
  let digits = String(input || '').replace(/\D/g, '');
  if (digits.startsWith('0')) digits = '6' + digits;
  else if (digits.startsWith('1')) digits = '60' + digits;
  // 60 + 1X + 7 or 8 digits
  return /^601\d{8,9}$/.test(digits) ? digits : null;
}
