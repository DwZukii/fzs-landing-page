import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalisePhone } from './normalisePhone.js';

test('normalises accepted Malaysian mobile formats', () => {
  assert.equal(normalisePhone('012-345 6789'), '60123456789');
  assert.equal(normalisePhone('0123456789'), '60123456789');
  assert.equal(normalisePhone('+60123456789'), '60123456789');
  assert.equal(normalisePhone('011-5699 5478'), '601156995478');
  assert.equal(normalisePhone('+60 11-5699 5478'), '601156995478');
});

test('rejects landlines and malformed numbers', () => {
  assert.equal(normalisePhone(''), null);
  assert.equal(normalisePhone('03-1234 5678'), null);
  assert.equal(normalisePhone('012345'), null);
  assert.equal(normalisePhone('abc'), null);
});
