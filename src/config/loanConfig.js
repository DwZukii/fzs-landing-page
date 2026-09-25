// All calculator figures live here. Components must import from this file,
// never hardcode a number. Every value came from one worked example and needs
// client sign-off before launch.
export const LOAN_CONFIG = {
  // Debt service ratio ceiling applied to basic income.
  // TODO: confirm with client — taken from the bank worksheet (60%).
  DSR_LIMIT: 0.6,

  // Second eligibility test: cost-of-living floor.
  // Total deductions + new installment + sara hidup must stay below
  // SARA_RATIO_MAX x income.
  // TODO: confirm with client whether this applies to all products or only one.
  SARA_HIDUP: { bandar: 700, luarBandar: 400 },
  // TODO: confirm with client.
  SARA_RATIO_MAX: 0.99,

  // Flat profit rate band across the panel. NEVER display these, and never
  // display which funder maps to which rate.
  // TODO: confirm with client — current band from the internal comparison tool.
  RATE_LOW: 0.0465,
  RATE_HIGH: 0.0999,

  // Product tenure ceiling in years.
  // TODO: RESOLVE CONFLICT — the bank worksheet says max tenure 10, but the
  // internal comparison tool priced 15. Confirm before launch.
  MAX_TENURE_YEARS: 10,
  // TODO: confirm with client.
  MIN_TENURE_YEARS: 2,
  // TODO: confirm with client.
  DEFAULT_TENURE_YEARS: 10,

  // Applicant must be fully repaid by this age.
  // TODO: confirm with client.
  MAX_AGE_AT_MATURITY: 60,
  // TODO: confirm with client.
  MIN_AGE: 18,
  // TODO: confirm with client.
  MAX_AGE: 58,

  // Hard ceiling on displayed estimate.
  // TODO: confirm with client.
  MAX_FINANCING: 250000,

  // Safety margin applied to the TOP of the displayed range so the public
  // estimate stays conservative. 0.90 = show 90% of the theoretical maximum.
  // Raise or lower this after comparing estimates against real approvals.
  // TODO: confirm with client.
  OPTIMISM_HAIRCUT: 0.9,

  // TODO: confirm with client.
  MIN_SALARY: 1500,
};
