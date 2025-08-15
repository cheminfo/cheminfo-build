import path from 'node:path';

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import type { InputPluginOption, RollupBuild, RollupOptions } from 'rollup';
import { rollup } from 'rollup';

import { getFullBanner, getMinifiedBanner } from './utils/banner.ts';
import { readPackageJson } from './utils/package_json.ts';

export interface BuildParams {
  /**
   * Working directory to do the build.
   */
  cwd: string;

  /**
   * Entry point of the library, relative to the working directory.
   */
  entryPoint: string;

  /**
   * Output directory, relative to the working directory.
   */
  outDir: string;

  /**
   * Base name of the output files.
   */
  outName: string;

  /**
   * Root name of the library for UMD builds.
   */
  rootName: string;

  /**
   * Whether to generate minified versions of the builds.
   */
  minify: boolean;

  /**
   * Whether to generate source maps.
   */
  sourceMap: boolean;
}

/**
 * Build the bundles with Rollup.
 * @param params - Build parameters.
 */
export async function build(params: BuildParams): Promise<void> {
  const { cwd, entryPoint, outDir, outName, rootName, minify, sourceMap } =
    params;
  const input = path.resolve(cwd, entryPoint);
  const output = path.resolve(cwd, outDir);
  const pkg = readPackageJson(cwd);
  {
    // Non-minified bundles
    const rollupOptions = getRollupOptions({ input, minify: false });
    const banner = getFullBanner(pkg);
    await using rollupBuild = await rollup(rollupOptions);
    await writeBundles(rollupBuild, {
      output,
      outName,
      rootName,
      banner,
      sourceMap,
      minify: false,
    });
  }
  if (minify) {
    // Minified bundles
    const rollupOptions = getRollupOptions({ input, minify: true });
    const banner = getMinifiedBanner(pkg);
    await using rollupBuild = await rollup(rollupOptions);
    await writeBundles(rollupBuild, {
      output,
      outName,
      rootName,
      banner,
      sourceMap,
      minify: true,
    });
  }
}

interface WriteBundlesParams {
  output: string;
  outName: string;
  rootName: string;
  banner: string;
  sourceMap: boolean;
  minify: boolean;
}

async function writeBundles(
  rollupBuild: RollupBuild,
  params: WriteBundlesParams,
) {
  const { output, outName, rootName, banner, sourceMap, minify } = params;
  const minifySuffix = minify ? '.min' : '';
  // UMD / CommonJS build.
  await rollupBuild.write({
    file: path.join(output, `${outName}.umd${minifySuffix}.cjs`),
    format: 'umd',
    name: rootName,
    banner,
    sourcemap: sourceMap,
  });
  // ESM build.
  await rollupBuild.write({
    file: path.join(output, `${outName}.esm${minifySuffix}.mjs`),
    format: 'esm',
    banner,
    sourcemap: sourceMap,
  });
}

interface GetRollupOptionsParams {
  input: string;
  minify: boolean;
}

function getRollupOptions(params: GetRollupOptionsParams): RollupOptions {
  const rollupOptions: RollupOptions = {
    input: params.input,
  };

  const plugins: InputPluginOption = [
    // @ts-expect-error https://github.com/rollup/plugins/issues/1860
    replace({
      values: { 'process.env.NODE_ENV': JSON.stringify('production') },
      preventAssignment: true,
    }),
    nodeResolve({ browser: true }),
    // @ts-expect-error https://github.com/rollup/plugins/issues/1860
    commonjs({ strictRequires: 'auto' }),
    // @ts-expect-error https://github.com/rollup/plugins/issues/1860
    json(),
    babel({
      babelHelpers: 'bundled',
      babelrc: false,
      configFile: false,
      presets: [
        [
          import.meta.resolve('@babel/preset-env'),
          {
            targets: {
              browsers: [
                'last 10 chrome versions',
                'last 2 safari versions',
                'last 2 firefox versions',
              ],
            },
          },
        ],
      ],
    }),
  ];

  if (params.minify) {
    plugins.push(
      // @ts-expect-error https://github.com/rollup/plugins/issues/1860
      terser({
        format: {
          comments(_: unknown, comment: { line: number; col: number }) {
            // Keep the banner comment.
            return comment.line === 1 && comment.col === 0;
          },
        },
      }),
    );
  }

  rollupOptions.plugins = plugins;

  return rollupOptions;
}
