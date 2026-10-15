import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalisePhone } from './normalisePhone.js';

test('normalises accepted Malaysian mobile formats', () => {
  assert.equal(normalisePhone('012-345 6789'), '60123456789');
  assert.equal(normalisePhone('0123456789'), '60123456789');
  assert.equal(normalisePhone('+60123456789'), '60123456789');
  // 011 numbers carry 8 digits after the prefix, one more than other 01X.
  assert.equal(normalisePhone('011-2345 6789'), '601123456789');
  assert.equal(normalisePhone('+60 11-2345 6789'), '601123456789');
});

test('the business WhatsApp number is itself a valid mobile', async () => {
  const { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } = await import('./whatsapp.js');
  assert.equal(normalisePhone(WHATSAPP_DISPLAY), WHATSAPP_NUMBER);
});

test('rejects landlines and malformed numbers', () => {
  assert.equal(normalisePhone(''), null);
  assert.equal(normalisePhone('03-1234 5678'), null);
  assert.equal(normalisePhone('012345'), null);
  assert.equal(normalisePhone('abc'), null);
});
