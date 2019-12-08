# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2019-12-08

### Added

- Added new method `naturalSort`.

### Changed

- `getLastNumber` - now available getting last number in brackets. e.g. `test (1).txt`
- `removeLastNumber` - now available removing last number in brackets. e.g. `test (1).txt`

### Deprecated

- `sortFilesByLastNumber` was deprecated. use `naturalSort` instead.

## [1.0.1] - 2019-12-01

- Fixed `setDir` (31e24810424f5a6de6159848fa0b1e22a66930c7)

## [1.0.0] - 2019-11-04

First Release!

[Unreleased]: https://github.com/archco/file-path-helper/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/archco/file-path-helper/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/archco/file-path-helper/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/archco/file-path-helper/releases/tag/v1.0.0
