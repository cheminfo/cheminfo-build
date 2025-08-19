import { describe, expect, it } from 'vitest';

import { getFullBanner, getMinifiedBanner } from './banner.ts';
import type { PackageJson } from './package_json.ts';

const basePkg = {
  name: 'my-package',
  license: 'MIT',
  version: '1.0.0',
} satisfies PackageJson;

const description = 'This is a test package';
const homepage = 'https://example.com';

const fullPkg = {
  ...basePkg,
  description,
  homepage,
} satisfies PackageJson;

describe('getFullBanner', () => {
  it('should generate a banner with a full pkg', () => {
    expect(getFullBanner(fullPkg)).toMatchInlineSnapshot(`
      "/*
       * my-package v1.0.0
       * This is a test package
       * https://example.com
       *
       * Licensed under the MIT license.
       */"
    `);
  });

  it('should generate a banner with minimal pkg', () => {
    expect(getFullBanner(basePkg)).toMatchInlineSnapshot(`
      "/*
       * my-package v1.0.0
       *
       * Licensed under the MIT license.
       */"
    `);
  });

  it('should generate a banner with only description', () => {
    expect(getFullBanner({ ...basePkg, description })).toMatchInlineSnapshot(`
      "/*
       * my-package v1.0.0
       * This is a test package
       *
       * Licensed under the MIT license.
       */"
    `);
  });

  it('should generate a banner with only homepage', () => {
    expect(getFullBanner({ ...basePkg, homepage })).toMatchInlineSnapshot(`
      "/*
       * my-package v1.0.0
       * https://example.com
       *
       * Licensed under the MIT license.
       */"
    `);
  });
});

describe('getMinifiedBanner', () => {
  it('should generate a banner with a complete pkg', () => {
    expect(getMinifiedBanner(fullPkg)).toMatchInlineSnapshot(
      `"/* my-package 1.0.0 | MIT | https://example.com */"`,
    );
  });

  it('should generate a banner with minimal pkg', () => {
    expect(getMinifiedBanner(basePkg)).toMatchInlineSnapshot(
      `"/* my-package 1.0.0 | MIT */"`,
    );
  });

  it('should generate a banner with only description', () => {
    expect(
      getMinifiedBanner({ ...basePkg, description }),
    ).toMatchInlineSnapshot(`"/* my-package 1.0.0 | MIT */"`);
  });

  it('should generate a banner with only homepage', () => {
    expect(getMinifiedBanner({ ...basePkg, homepage })).toMatchInlineSnapshot(
      `"/* my-package 1.0.0 | MIT | https://example.com */"`,
    );
  });
});
