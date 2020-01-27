# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.6] - 2020-01-27
### Fix
- Fixed router shim, now it works as expected
- Updated dependencies to fix security vulnerabilities

## [1.0.5] - 2019-01-14
### Fix
- Fixed typo in CHANGELOG
- Updated dependencies to fix security vulnerabilities

## [1.0.4] - 2018-06-07
### Added
- Fixed typo in README
- CHANGELOG is now included in npm package

## [1.0.3] - 2018-06-07
### Added
- Added `Installation` section to README

## [1.0.2] - 2018-06-07
### Added
- Added yarn/npm `lock` files to `.gitignore`

### Fix
- Fixed typings entry point in `package.json`, that was pointing to wrong folder

## [1.0.1] - 2018-06-07
### Added
- README fully written
- src folder now also included in npm package, as of source maps need to point somewhere

### Fix
- Added `src/index.ts` that exports all of package contents to generate proper `d.ts` 
declarations  
- Typings moved from `dist/src` folder to `dist`, so now each `d.ts` file is alongside 
with corresponding `js` file, so IDE's can consume them

## [1.0.0] - 2018-06-07
### Added
- Added README, saying that this is a WIP project
- Added router
- Added singleton router in `shim` folder
- Added MIT LICENCE







