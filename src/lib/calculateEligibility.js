import { LOAN_CONFIG as C } from '../config/loanConfig.js';

// Longest tenure available for a given age, capped by the product ceiling.
export function maxTenureForAge(umur) {
  const maxTenureByAge = Math.max(0, C.MAX_AGE_AT_MATURITY - umur);
  return Math.min(C.MAX_TENURE_YEARS, maxTenureByAge);
}

export function calculateEligibility({ gajiPokok, jumlahPotongan, umur, lokasi, tempoh }) {
  // 1. Tenure ceiling from age and product cap
  const maxTenure = maxTenureForAge(umur);
  const years = Math.min(tempoh, maxTenure);

  if (years < C.MIN_TENURE_YEARS) {
    return { eligible: false, reason: 'AGE' };
  }

  // 2. Test A — DSR ceiling on basic income
  const bakiDSR = gajiPokok * C.DSR_LIMIT - jumlahPotongan;

  // 3. Test B — cost-of-living floor
  const saraHidup = C.SARA_HIDUP[lokasi];
  const bakiSaraHidup = gajiPokok * C.SARA_RATIO_MAX - jumlahPotongan - saraHidup;

  // 4. The binding constraint is whichever is tighter
  const ansuranMampu = Math.min(bakiDSR, bakiSaraHidup);

  if (ansuranMampu <= 0) {
    return { eligible: false, reason: 'DSR', ansuranMampu };
  }

  // 5. Flat-rate principal:  total = P(1 + r·y),  monthly = total / months
  //    =>  P = (monthly · months) / (1 + r·y)
  const months = years * 12;
  const principalAt = (rate) => (ansuranMampu * months) / (1 + rate * years);

  // Higher rate yields a lower principal, so it forms the bottom of the range.
  let low = principalAt(C.RATE_HIGH);
  let high = principalAt(C.RATE_LOW) * C.OPTIMISM_HAIRCUT;

  low = Math.min(low, C.MAX_FINANCING);
  high = Math.min(high, C.MAX_FINANCING);

  return {
    eligible: true,
    low: Math.floor(low / 1000) * 1000,
    high: Math.floor(high / 1000) * 1000,
    ansuranMampu: Math.round(ansuranMampu),
    years,
    maxTenure,
  };
}

// Returns { field: errorKey } for invalid inputs; empty object when valid.
// The calculator must not run unless this returns no errors.
export function validateInputs({ gajiPokok, jumlahPotongan, umur }) {
  const errors = {};
  if (!Number.isFinite(gajiPokok) || gajiPokok <= 0) errors.gajiPokok = 'required';
  else if (gajiPokok < C.MIN_SALARY) errors.gajiPokok = 'minSalary';

  if (!Number.isFinite(jumlahPotongan) || jumlahPotongan < 0) errors.jumlahPotongan = 'required';
  else if (Number.isFinite(gajiPokok) && jumlahPotongan >= gajiPokok) errors.jumlahPotongan = 'tooHigh';

  if (!Number.isFinite(umur)) errors.umur = 'required';
  else if (umur < C.MIN_AGE || umur > C.MAX_AGE) errors.umur = 'ageRange';

  return errors;
}
