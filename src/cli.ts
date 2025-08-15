#!/usr/bin/env node

import path from 'node:path';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { build } from './build.ts';
import { readPackageJson } from './utils/package_json.ts';
import { resolveEntryPoint } from './utils/resolve_entry_point.ts';

const program = yargs()
  .scriptName('cheminfo-build')
  .option('cwd', {
    alias: 'c',
    describe: 'Working directory',
    type: 'string',
    requiresArg: true,
  })
  .option('entry', {
    alias: 'e',
    describe: 'Library entry point',
    type: 'string',
    requiresArg: true,
  })
  .option('out', {
    alias: 'o',
    describe: 'Output directory',
    type: 'string',
    requiresArg: true,
    default: 'dist',
  })
  .option('out-name', {
    alias: 'n',
    describe: 'Name of the output file',
    type: 'string',
    requiresArg: true,
  })
  .option('root', {
    alias: 'r',
    describe: 'Root name of the library',
    type: 'string',
    requiresArg: true,
  })
  .option('minify', {
    describe: 'Generate a .min.js file',
    type: 'boolean',
    default: true,
  })
  .option('source-map', {
    describe: 'Generate source maps',
    type: 'boolean',
    default: true,
  })
  .strict()
  .help()
  .parseSync(hideBin(process.argv));

const cwd = path.resolve(program.cwd ?? process.cwd());
const pkg = readPackageJson(cwd);
const entryPoint = program.entry ?? resolveEntryPoint(cwd, pkg);
const outDir = program.out ?? 'dist';
const outName = program.outName ?? pkg.name;
const rootName = program.root ?? toCamelCase(pkg.name);
const minify = program.minify;
const sourceMap = program.sourceMap;

await build({ cwd, entryPoint, outDir, outName, rootName, minify, sourceMap });

function toCamelCase(str: string) {
  return str.replaceAll(/[@/.-]\w?/g, (match) => {
    return match[1] ? match[1].toUpperCase() : '';
  });
}
