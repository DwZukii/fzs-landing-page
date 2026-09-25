import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateEligibility, validateInputs } from './calculateEligibility.js';
import { LOAN_CONFIG as C } from '../config/loanConfig.js';

const base = { gajiPokok: 5815.72, jumlahPotongan: 1767.19, umur: 39, lokasi: 'bandar', tempoh: 10 };

test('worked example: DSR is the binding constraint and a range is returned', () => {
  const bakiDSR = base.gajiPokok * C.DSR_LIMIT - base.jumlahPotongan;
  const bakiSara = base.gajiPokok * C.SARA_RATIO_MAX - base.jumlahPotongan - C.SARA_HIDUP.bandar;
  assert.equal(Math.round(bakiDSR * 100) / 100, 1722.24);
  // Exact value is 3290.3728; the brief quotes 3290.36 (bank worksheet rounding).
  assert.ok(Math.abs(bakiSara - 3290.36) < 0.02);
  assert.ok(bakiDSR < bakiSara);

  const r = calculateEligibility(base);
  assert.equal(r.eligible, true);
  assert.equal(r.ansuranMampu, 1722);
  assert.equal(r.years, 10);
  assert.equal(r.low, 103000);
  assert.equal(r.high, 126000);
  assert.ok(r.low <= r.high);
});

test('deductions so high that ansuranMampu <= 0 → DSR', () => {
  const r = calculateEligibility({ ...base, jumlahPotongan: 3600 });
  assert.equal(r.eligible, false);
  assert.equal(r.reason, 'DSR');
  assert.ok(r.ansuranMampu <= 0);
});

test('cost-of-living test binds when it is tighter than DSR', () => {
  // DSR: 0.6·1600 = 960; sara hidup: 0.99·1600 − 700 = 884
  const r = calculateEligibility({ ...base, gajiPokok: 1600, jumlahPotongan: 0 });
  assert.equal(r.eligible, true);
  assert.equal(r.ansuranMampu, 884);
});

test('umur 57 → maxTenure 3', () => {
  const r = calculateEligibility({ ...base, umur: 57 });
  assert.equal(r.eligible, true);
  assert.equal(r.maxTenure, 3);
  assert.equal(r.years, 3);
});

test('umur 59 → AGE', () => {
  assert.deepEqual(calculateEligibility({ ...base, umur: 59 }), { eligible: false, reason: 'AGE' });
});

test('estimate never exceeds MAX_FINANCING', () => {
  const r = calculateEligibility({ ...base, gajiPokok: 60000, jumlahPotongan: 0 });
  assert.equal(r.high, C.MAX_FINANCING);
  assert.equal(r.low, C.MAX_FINANCING);
});

test('salary below MIN_SALARY is blocked at validation', () => {
  const errors = validateInputs({ gajiPokok: C.MIN_SALARY - 1, jumlahPotongan: 0, umur: 30 });
  assert.equal(errors.gajiPokok, 'minSalary');
});

test('deductions must be below salary and age must be in range', () => {
  const errors = validateInputs({ gajiPokok: 3000, jumlahPotongan: 3000, umur: 60 });
  assert.equal(errors.jumlahPotongan, 'tooHigh');
  assert.equal(errors.umur, 'ageRange');
  assert.deepEqual(validateInputs({ gajiPokok: 3000, jumlahPotongan: 500, umur: 30 }), {});
});
