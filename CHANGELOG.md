# Changelog

## [1.3.2](https://github.com/cheminfo/cheminfo-build/compare/v1.3.1...v1.3.2) (2025-12-15)


### Bug Fixes

* update dependencies ([#5](https://github.com/cheminfo/cheminfo-build/issues/5)) ([ca5b895](https://github.com/cheminfo/cheminfo-build/commit/ca5b895b326734c4d3509a0970e0ab2d467a5a09))

## [1.3.1](https://github.com/cheminfo/cheminfo-build/compare/v1.3.0...v1.3.1) (2025-08-19)


### Bug Fixes

* remove extra space in full license banner ([#3](https://github.com/cheminfo/cheminfo-build/issues/3)) ([f77a11e](https://github.com/cheminfo/cheminfo-build/commit/f77a11eb75dc849ff9c61962c9f9f59179b026cd))

## 1.3.0 (2025-08-15)


### ⚠ BREAKING CHANGES

* The default entry point will now consider "exports" first. ESM bundles are also generated. The UMD bundles now have the extension `.umd.cjs` and the ESM bundles have the extension `.esm.mjs`.

### Features

* add ESM bundles ([7fe78a4](https://github.com/cheminfo/cheminfo-build/commit/7fe78a47f1cdde04317318ea975a6ebb92c049af))


### Bug Fixes

* revert to .js ([#2](https://github.com/cheminfo/cheminfo-build/issues/2)) ([c86c87a](https://github.com/cheminfo/cheminfo-build/commit/c86c87a40548524f7c9b0730959cfc6cda56d86e))
* set ".min" suffix after ".esm/.umd" ([dfa6a99](https://github.com/cheminfo/cheminfo-build/commit/dfa6a9918d52dbfc3e67c44f2aafba2f04dad5e3))
