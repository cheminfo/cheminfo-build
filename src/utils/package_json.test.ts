import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { parsePackageJson, readPackageJson } from './package_json.ts';

describe('parsePackageJson', () => {
  it('should parse a valid minimal package.json string', () => {
    expect(
      parsePackageJson('{"name":"test","version":"1.2.3","license":"MIT"}'),
    ).toStrictEqual({ name: 'test', version: '1.2.3', license: 'MIT' });
  });

  it('should throw for missing fields', () => {
    expect(() => parsePackageJson('{"name":"test","version":"1.2.3"}')).toThrow(
      /license/,
    );
  });
});

describe('readPackageJson', () => {
  it('should read a valid package.json file', () => {
    expect(
      readPackageJson(path.join(import.meta.dirname, '../..')),
    ).toMatchObject({ name: 'cheminfo-build' });
  });
});
