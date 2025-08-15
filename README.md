# cheminfo-build

[![NPM version](https://img.shields.io/npm/v/cheminfo-build.svg)](https://www.npmjs.com/package/cheminfo-build)
[![npm download](https://img.shields.io/npm/dm/cheminfo-build.svg)](https://www.npmjs.com/package/cheminfo-build)
[![test coverage](https://img.shields.io/codecov/c/github/cheminfo/cheminfo-build.svg)](https://codecov.io/gh/cheminfo/cheminfo-build)
[![license](https://img.shields.io/npm/l/cheminfo-build.svg)](https://github.com/cheminfo/cheminfo-build/blob/main/LICENSE)

CLI tool to build ChemInfo packages.

## Installation

```console
npm install -D cheminfo-build
```

## Usage

```console
cheminfo-build <options>
```

### options

- `-c, --cwd`: directory of the project to build. Defaults to the current working directory.
- `-e, --entry`: entry point of the library. Default: "exports", or "module", or "main" field from package.json, or "lib/index.js", or "src/index.js" if it exists.
- `-o, --out`: directory where to put the build files. Default: dist
- `-n, --out-name`: name of the output file. Default: "name" field from package.json
- `-r, --root`: root name of the library. Default: name of npm package (camelCase)
- `--no-minify`: Disable generation of minified files.
- `--no-source-map`: Disable generation of source maps.

## License

[MIT](./LICENSE)
