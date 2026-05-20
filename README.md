#  Playwright Automation Project as requested by Broadvoice

##  Overview

This project contains end-to-end UI automation tests using **Playwright** for the Bertrand website.

The tests cover:
- Book search
- Product validation
- Cart operations (add, increase, decrease, remove)
- Author page navigation

---

##  Prerequisites

- Node.js (https://nodejs.org/)
- npm (comes with Node.js)


##  Install dependencies

```
npm ci
```

## Install Playwright browsers

```
npx playwright install --with-deps
```

## Running Tests

```
npx playwright test
```

## Running Tests in UI mode

```
npx playwright test --ui
```

## View HTML report

```
npx playwright show-report
```

## Assumptions

- The first result is the best match for the search item
- The cart is empty on execution
- The UI is in a stable state
- There's no outside data that can interfere with the test

## Limitations

- Some endpoints are protected (403 Forbidden when accessing the endpoints directly)
- Testing via UI implies more maintenance and costs due to flakiness

## Github Actions CI

- Every push and pull request starts the Github Actions workflow
```
.github/workflows/playwright.yml
```