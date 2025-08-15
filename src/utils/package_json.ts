import fs from 'node:fs';
import path from 'node:path';

import { z } from 'zod';

const packageJsonSchema = z.object({
  name: z.string(),
  version: z.string(),
  license: z.string(),
  description: z.string().optional(),
  homepage: z.string().optional(),
  exports: z.union([z.string(), z.record(z.string(), z.string())]).optional(),
  module: z.string().optional(),
  main: z.string().optional(),
});

export type PackageJson = z.infer<typeof packageJsonSchema>;

/**
 * Parse a package.json file and validate the fields that we need.
 * @param packageJson - The contents of the package.json file.
 * @returns The validated package.json file.
 */
export function parsePackageJson(packageJson: string): PackageJson {
  return packageJsonSchema.parse(JSON.parse(packageJson));
}

/**
 * Read the package.json file from the given working directory and validate the fields that we need.
 * @param cwd - Working directory.
 * @returns The validated package.json file.
 */
export function readPackageJson(cwd: string) {
  const pkgPath = path.join(cwd, 'package.json');
  return parsePackageJson(fs.readFileSync(pkgPath, 'utf8'));
}
