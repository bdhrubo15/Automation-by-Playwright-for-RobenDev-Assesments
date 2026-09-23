<div align="center">

# Automation-by-Playwright-for-RobenDev-Assesments


# 🎭 AutomationExercise · Playwright Test Suite

**End-to-end UI automation for [automationexercise.com](https://www.automationexercise.com/)**

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

[![Tests](https://img.shields.io/badge/tests-31%20passing-brightgreen?style=flat-square)](#-test-coverage)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff69b4?style=flat-square)](#)

</div>

---

## ✨ Overview

A clean, structured Playwright suite that exercises the core flows of **automationexercise.com** — navigation, auth, product discovery, cart, and contact — with one spec file per feature area, cross-browser runs, and HTML reporting out of the box.

## 📁 Project Structure

```
automationexercise-playwright/
├── tests/
│   ├── homePage.spec.js        🏠 Header, nav, carousel, features, footer
│   ├── loginSignup.spec.js     🔐 Login errors, signup flow, duplicate email
│   ├── productsPage.spec.js    🛍️  Listing, search, product detail
│   ├── cartPage.spec.js        🛒 Add/remove, quantity, checkout entry
│   ├── contactUs.spec.js       ✉️  Form fields + submission success
│   └── testCasesPage.spec.js   📋 Test Cases listing page
├── playwright.config.js
├── package.json
└── .gitignore
```

## 🧪 Test Coverage

| Suite | Focus | Cases |
|---|---|---|
| 🏠 `homePage` | Title, logo, nav, carousel, features, subscribe, scroll-up | 9 |
| 🔐 `loginSignup` | Signup/login visibility, bad-login error, signup flow, duplicate email | 6 |
| 🛍️ `productsPage` | Listing, search (hit/miss), detail page, quantity | 7 |
| 🛒 `cartPage` | Add to cart, quantity, remove, empty state, checkout | 7 |
| ✉️ `contactUs` | Field visibility, success message, return-home link | 4 |
| 📋 `testCasesPage` | Heading, list populated, titles visible | 3 |

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install browser binaries
npx playwright install

# 3. Run the suite
npm test
```

## 🕹️ Commands

| Command | What it does |
|---|---|
| `npm test` | Headless run across Chromium, Firefox & WebKit |
| `npm run test:headed` | Run with visible browser windows |
| `npm run test:ui` | Launch Playwright's interactive UI mode |
| `npm run report` | Open the last HTML report |
| `npx playwright test tests/cartPage.spec.js` | Run a single spec file |
| `npx playwright test --project=chromium` | Run a single browser |

## ⚙️ Configuration

`playwright.config.js` highlights:

- **`baseURL`** → `https://www.automationexercise.com/`
- **Trace** → captured on first retry
- **Screenshots / video** → on failure only
- **Projects** → Chromium, Firefox, WebKit
- **Retries** → auto-enabled in CI

## 📝 Notes & Gotchas

- 🔑 `loginSignup.spec.js` generates unique emails via `Date.now()` so signup tests are safely re-runnable. The "already registered" test uses a placeholder — swap in a real pre-registered account for a deterministic pass.
- ✉️ `contactUs.spec.js` submits the **live** contact form and auto-accepts the browser confirmation dialog.
- 🎯 Selectors prefer the site's built-in `data-qa` attributes, falling back to roles/text where those aren't present.
- 🌐 Tests run against a live public site — expect occasional flakiness from shared state or latency; `retries` is pre-configured for CI runs.

---

<div align="center">

Built with 🎭 Playwright

</div>
