# Contributing to bd-geo

Thank you for your interest in contributing to **bd-geo** 🇧🇩

bd-geo is an open-source TypeScript package providing structured Bangladesh geographical data and utilities.

Contributions are welcome, especially improvements to geographical data, utilities, documentation, tests, and developer experience.

---

## Getting Started

### 1. Fork the repository

Fork the repository to your own GitHub account:

https://github.com/mohammad-oliullah/bd-geo

### 2. Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/bd-geo.git
cd bd-geo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a branch

Do not work directly on `main`.

Create a descriptive branch:

```bash
git checkout -b feat/add-new-data
```

Examples:

```text
feat/add-new-data
fix/district-data
fix/upazila-name
docs/update-readme
test/add-data-tests
refactor/utility-functions
```

---

## Making Changes

Before submitting a Pull Request:

1. Keep changes focused and related to the purpose of your branch.
2. Follow the existing TypeScript code style.
3. Add or update tests when appropriate.
4. Update documentation when your change affects the public API.
5. Make sure the project builds successfully.

Run:

```bash
npm test
```

and:

```bash
npm run build
```

Both should complete successfully before opening a Pull Request.

---

## Geographical Data Contributions

If you are contributing Bangladesh geographical data:

- Verify the information using a reliable source.
- Preserve the existing data structure.
- Do not change IDs unnecessarily.
- Keep English and Bangla names accurate.
- Avoid duplicate entries.
- Include relevant tests when adding or modifying data.

For changes involving administrative boundaries, names, IDs, or other official geographical information, please provide the source or reference in your Pull Request description.

---

## Commit Messages

Use clear and descriptive commit messages.

Examples:

```text
feat: add new upazila data
fix: correct district name
fix: update upazila coordinates
docs: improve installation guide
test: add district data tests
refactor: simplify location lookup
```

---

## Pull Request Process

When your changes are ready:

### 1. Push your branch

```bash
git push origin your-branch-name
```

### 2. Open a Pull Request

Open a Pull Request from your fork to:

```text
mohammad-oliullah/bd-geo
```

Target branch:

```text
main
```

### 3. Describe your changes

Please include:

- What you changed
- Why you changed it
- Any relevant source or reference
- Tests you performed

For example:

```md
## What changed

Added missing upazila data for District X.

## Why

The existing dataset was missing these entries.

## Source

Official administrative data source.

## Tests

- npm test
- npm run build
```

---

## Pull Request Guidelines

Please:

- Keep Pull Requests focused.
- Avoid unrelated changes.
- Do not modify generated files unless necessary.
- Do not commit secrets, API keys, credentials, or environment files.
- Make sure tests and builds pass.
- Respond to review feedback when requested.

---

## Main Branch Protection

The `main` branch is protected.

Direct pushes to `main` are not part of the normal contribution workflow.

All external contributions should be submitted through Pull Requests.

The repository maintainer has final authority over whether a Pull Request is merged.

---

## Reporting Bugs

If you find a bug, please open an issue:

[https://github.com/mohammad-oliullah/bd-geo/issues](https://github.com/mohammad-oliullah/bd-geo/issues)

Include:

- A clear description of the problem
- Steps to reproduce it
- Expected behavior
- Actual behavior
- Relevant code or error messages
- Node.js and package version, when applicable

---

## Feature Requests

Feature requests are welcome.

Before opening a feature request, please check whether a similar issue already exists.

Explain:

- What you would like to add
- Why it would be useful
- How you think it could work

---

## Code of Conduct

Please be respectful and constructive when interacting with other contributors.

Harassment, discrimination, personal attacks, or intentionally disruptive behavior are not welcome.

---

## License

By contributing to **bd-geo**, you agree that your contributions will be licensed under the same license as the project.

bd-geo is distributed under the **MIT License**.

```

One other small point: your statement

> "The repository maintainer has final authority over whether a Pull Request is merged."

is good because it makes your intended workflow clear without sounding unnecessarily restrictive.

**This version is ready to save as `CONTRIBUTING.md`.**
```
