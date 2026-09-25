// Fails the build when the bm and en copy trees have different key sets
// (including array lengths, e.g. a missing FAQ item).
import { copy } from '../src/i18n/copy.js';

function flatten(node, prefix = '', out = new Set()) {
  if (node !== null && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  } else {
    out.add(prefix);
  }
  return out;
}

const bm = flatten(copy.bm);
const en = flatten(copy.en);
const missingInEn = [...bm].filter((k) => !en.has(k));
const missingInBm = [...en].filter((k) => !bm.has(k));

if (missingInEn.length || missingInBm.length) {
  console.error('i18n check failed: bm and en key sets diverge.');
  if (missingInEn.length) console.error('  Missing in en:\n    ' + missingInEn.join('\n    '));
  if (missingInBm.length) console.error('  Missing in bm:\n    ' + missingInBm.join('\n    '));
  process.exit(1);
}
console.log(`i18n check passed (${bm.size} keys).`);
