import path from 'node:path';

import { expect, test } from 'vitest';

import { resolveEntryPoint } from './resolve_entry_point.ts';

const root = path.join(import.meta.dirname, '../../');

test('should resolve the entry point from cwd', () => {
  expect(resolveEntryPoint(root)).toBe('./lib/index.js');
});

test('should fallback to src/index.js', () => {
  expect(resolveEntryPoint(path.join(root, 'test/fixtures/cwd1'))).toBe(
    'src/index.js',
  );
});
