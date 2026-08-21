# @olism/bd-geo Roadmap

This document tracks planned improvements and future development for `@olism/bd-geo`.

The roadmap may change as the dataset, API, and community requirements evolve.

---

## 🗺️ Data

### Administrative Data

- [ ] Complete all 8 divisions
- [ ] Complete all 64 districts
- [ ] Complete all thanas/upazilas
- [ ] Complete all unions
- [ ] Complete all wards
- [ ] Verify all English names
- [ ] Verify all Bangla names
- [ ] Verify parent-child relationships
- [ ] Verify administrative classifications
- [ ] Add reliable latitude/longitude coordinates
- [ ] Improve data consistency
- [ ] Detect duplicate records
- [ ] Validate all geographical IDs

### Data Quality

- [ ] Add automated data validation
- [ ] Validate every district belongs to a valid division
- [ ] Validate every thana belongs to a valid district
- [ ] Validate every area belongs to a valid thana
- [ ] Validate `union` / `ward` area types
- [ ] Validate unique IDs
- [ ] Validate required names
- [ ] Validate Bangla Unicode data
- [ ] Add dataset statistics
- [ ] Document data sources
- [ ] Document data update process

---

## 🔎 API

### Basic Lookup

- [ ] `getDivision(id)`
- [ ] `getDistrict(id)`
- [ ] `getThana(id)`
- [ ] `getArea(id)`

### Parent → Children

- [ ] `getDistrictsByDivision(id)`
- [ ] `getThanasByDistrict(id)`
- [ ] `getAreasByThana(id)`

### Children → Parent

- [ ] `getDivisionByDistrict(id)`
- [ ] `getDistrictByThana(id)`
- [ ] `getThanaByArea(id)`

### Search

- [ ] Search by English name
- [ ] Search by Bangla name
- [ ] Case-insensitive search
- [ ] Partial name search
- [ ] Search across all geographical levels
- [ ] Search with aliases
- [ ] Search with normalized Bangla text

### Hierarchical Utilities

- [ ] Get complete location hierarchy
- [ ] Get ancestors of a location
- [ ] Get descendants of a location
- [ ] Validate a location hierarchy
- [ ] Resolve location from IDs
- [ ] Resolve location from names

---

## 🌐 Localization

- [ ] English names
- [ ] Bangla names
- [ ] Support alternative English spellings
- [ ] Support alternative Bangla spellings
- [ ] Improve transliteration support
- [ ] Add normalized search names

---

## 📍 Geographic Features

- [ ] Reliable coordinates for divisions
- [ ] Reliable coordinates for districts
- [ ] Reliable coordinates for thanas/upazilas
- [ ] Reliable coordinates for areas
- [ ] Bounding-box support
- [ ] Distance calculation utilities
- [ ] Find nearest location
- [ ] Geographic search utilities

---

## 🗄️ Database / Seed Support

- [ ] PostgreSQL seed example
- [ ] MySQL seed example
- [ ] SQLite seed example
- [ ] MongoDB seed example
- [ ] Prisma seed example
- [ ] TypeORM seed example
- [ ] Sequelize seed example
- [ ] Drizzle seed example
- [ ] Mongoose seed example

---

## ⚛️ Framework Examples

- [ ] React example
- [ ] Next.js example
- [ ] NestJS example
- [ ] Express.js example
- [ ] Vue example
- [ ] Nuxt example

---

## 🧪 Testing

- [ ] Unit tests for all API functions
- [ ] Data integrity tests
- [ ] Relationship validation tests
- [ ] Duplicate ID detection tests
- [ ] Missing field detection tests
- [ ] Area type validation tests
- [ ] English name validation tests
- [ ] Bangla name validation tests
- [ ] Coordinate validation tests
- [ ] Test ESM imports
- [ ] Test package installation
- [ ] Test Next.js compatibility
- [ ] Test Node.js compatibility

---

## 📦 Package

- [x] TypeScript support
- [x] ESM build
- [x] TypeScript declarations
- [x] npm package
- [x] Public npm publishing
- [ ] CommonJS support
- [ ] Improve tree-shaking
- [ ] Optimize package size
- [ ] Package exports configuration
- [ ] Node.js version compatibility documentation
- [ ] Browser compatibility documentation
- [ ] Automated releases

---

## 🚀 Developer Experience

- [ ] Better API documentation
- [ ] API reference website
- [ ] Interactive examples
- [ ] Usage examples repository
- [ ] Better error messages
- [ ] JSDoc comments for public APIs
- [ ] Typedoc documentation
- [ ] Changelog
- [ ] Migration guides

---

## 🔄 Versioning & Releases

### `0.x`

Focus on building and validating the core dataset and API.

- [ ] Complete core geographical dataset
- [ ] Stabilize API
- [ ] Improve tests
- [ ] Improve documentation

### `1.0.0`

Target a stable API and reliable dataset.

- [ ] Complete core dataset
- [ ] Stable public API
- [ ] Comprehensive test coverage
- [ ] Documented data sources
- [ ] Documented breaking-change policy
- [ ] Production-ready release

---

## 🤖 Automation

- [ ] GitHub Actions
- [ ] Automated tests on pull requests
- [ ] Automated build verification
- [ ] Automated package validation
- [ ] Automated npm publishing
- [ ] Release automation
- [ ] Automated changelog generation

---

## 🤝 Community

- [ ] GitHub repository documentation
- [ ] Contribution guide
- [ ] Issue templates
- [ ] Pull request template
- [ ] Code of conduct
- [ ] Community data corrections
- [ ] Data correction review process

---

## 📚 Documentation

- [ ] Installation documentation
- [ ] API documentation
- [ ] Data model documentation
- [ ] Seed documentation
- [ ] React examples
- [ ] Next.js examples
- [ ] NestJS examples
- [ ] Express.js examples
- [ ] Database examples
- [ ] Migration documentation
- [ ] FAQ

---

## 🎯 Long-Term Ideas

These are exploratory ideas and are not guaranteed to become part of the package.

- [ ] Address parser
- [ ] Address formatter
- [ ] Bangladesh address validation
- [ ] Postal code integration
- [ ] Division/district/thana postal information
- [ ] Location autocomplete
- [ ] Location selector utilities
- [ ] GeoJSON support
- [ ] Map integration helpers
- [ ] OpenStreetMap integration
- [ ] Administrative boundary support
- [ ] Offline-first geographic dataset
- [ ] Lightweight browser-only dataset
- [ ] Server-optimized dataset
- [ ] Separate packages for large datasets

---

## 📌 Current Status

Current package:

```text
@olism/bd-geo
```
