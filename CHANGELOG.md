# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.4.5 - 2022-04-04

- Update dependencies.

## 1.4.4 - 2022-02-01

- Handling [Control Codes](https://en.wikipedia.org/wiki/C0_and_C1_control_codes) in `sanitize` method.
- Update dependencies.

## 1.4.3 - 2021-05-11

- Update dependencies.

## [1.4.0] - 2020-02-08

- Added new array methods: `filter` and `chunks`. (fe6e6be7a41e8d864cae7d2120179d141c56cdc3)
- Added new date methods: `parseDate`, `getDates` and `diffDays`. (2491f9df52c801931296caab36dd096ad81645cf)
- Removed deprecated method `sortFilesByLastNumber`. use `naturalSort` instead. (e2d41731e87db16fb136b80c692c2182fe2eff11)

## [1.3.0] - 2019-12-26

- Added a new method `truncate`.
- Added a new method `sanitize`.

## [1.2.0] - 2019-12-21

- Added a new method `bytesToSize`.
- Added a new method `parseSize`.

## [1.1.0] - 2019-12-08

### Added

- Added a new method `naturalSort`.

### Changed

- `getLastNumber` - now available getting last number in brackets. e.g. `test (1).txt`
- `removeLastNumber` - now available removing last number in brackets. e.g. `test (1).txt`

### Deprecated

- `sortFilesByLastNumber` was deprecated. use `naturalSort` instead.

## [1.0.1] - 2019-12-01

- Fixed `setDir` (31e24810424f5a6de6159848fa0b1e22a66930c7)

## [1.0.0] - 2019-11-04

First Release!

[Unreleased]: https://github.com/archco/file-path-helper/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/archco/file-path-helper/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/archco/file-path-helper/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/archco/file-path-helper/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/archco/file-path-helper/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/archco/file-path-helper/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/archco/file-path-helper/releases/tag/v1.0.0
