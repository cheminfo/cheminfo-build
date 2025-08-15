import fs from 'node:fs';
import path from 'node:path';

import { readPackageJson } from './package_json.ts';

/**
 * Given a working directory, resolve the entry point of the library.
 * Will search in this order:
 * - "exports" field in package.json
 * - "module" field in package.json
 * - "main" field in package.json
 * - "lib/index.js"
 * - "src/index.js"
 * @param cwd - Working directory for the resolution.
 * @param pkg - Parsed package.json file.
 * @returns The resolved entry point of the library, relative to the working directory.
 */
export function resolveEntryPoint(
  cwd: string,
  pkg = readPackageJson(cwd),
): string {
  if (pkg.exports && typeof pkg.exports === 'string') {
    return pkg.exports;
  } else if (
    pkg.exports &&
    typeof pkg.exports === 'object' &&
    pkg.exports['.']
  ) {
    return pkg.exports['.'];
  } else if (pkg.module) {
    return pkg.module;
  } else if (pkg.main) {
    return pkg.main;
  } else if (fs.existsSync(path.resolve(cwd, 'lib/index.js'))) {
    return 'lib/index.js';
  } else if (fs.existsSync(path.resolve(cwd, 'src/index.js'))) {
    return 'src/index.js';
  } else {
    throw new Error(`Could not resolve entry point from ${path.resolve(cwd)}`);
  }
}
