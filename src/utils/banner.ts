import type { PackageJson } from './package_json.ts';

/**
 * Generate a "full" banner comment for the given package.json.
 * This is used to add a multiline banner to the top of the generated files.
 * @param pkg - Parsed package.json file.
 * @returns The banner comment.
 */
export function getFullBanner(pkg: PackageJson) {
  const result = ['/*', ` * ${pkg.name} v${pkg.version}`];
  if (pkg.description) {
    result.push(` * ${pkg.description}`);
  }
  if (pkg.homepage) {
    result.push(` * ${pkg.homepage}`);
  }
  result.push(' *', ` * Licensed under the  ${pkg.license} license.`, ' */');
  return result.join('\n');
}

/**
 * Generate a minified banner comment for the given package.json.]
 * This is used to add a single-line banner to the top of the generated files.
 * @param pkg - Parsed package.json file.
 * @returns The banner comment.
 */
export function getMinifiedBanner(pkg: PackageJson) {
  const result = ['/*', pkg.name, pkg.version, '|', pkg.license];
  if (pkg.homepage) {
    result.push(`| ${pkg.homepage}`);
  }
  result.push('*/');
  return result.join(' ');
}
