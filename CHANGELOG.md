# Changelog

## 1.3.0 (2025-08-15)


### ⚠ BREAKING CHANGES

* The default entry point will now consider "exports" first. ESM bundles are also generated. The UMD bundles now have the extension `.umd.cjs` and the ESM bundles have the extension `.esm.mjs`.

### Features

* add ESM bundles ([7fe78a4](https://github.com/cheminfo/cheminfo-build/commit/7fe78a47f1cdde04317318ea975a6ebb92c049af))


### Bug Fixes

* revert to .js ([#2](https://github.com/cheminfo/cheminfo-build/issues/2)) ([c86c87a](https://github.com/cheminfo/cheminfo-build/commit/c86c87a40548524f7c9b0730959cfc6cda56d86e))
* set ".min" suffix after ".esm/.umd" ([dfa6a99](https://github.com/cheminfo/cheminfo-build/commit/dfa6a9918d52dbfc3e67c44f2aafba2f04dad5e3))
