# Custom Constellation Custom DX Components UI Gallery


For documentaion Constellation Custom DX Components UI Gallery refer - https://github.com/pegasystems/constellation-ui-gallery

# Pega_Extensions_PasswordInputEnhanced

## Overview
`Pega_Extensions_PasswordInputEnhanced` is a highly secure, custom Constellation DX component built to handle sensitive text input (such as passwords, API keys, or SSNs) within Pega applications. It replaces the default text input to provide a better user experience and stricter security in review modes.

## ✨ Key Features

### 1. Interactive Visibility Toggling
- **Dynamic Masking:** By default, all keystrokes are masked (`type="password"`).
- **Eye / Eye-Off Toggle:** The component integrates `@pega/cosmos-react-core`'s standard icons, allowing users to temporarily reveal the plaintext value by clicking the eye icon inside the input field.

### 2. Enhanced Security in Read-Only Modes
Pega forms often transition to review or summary screens. This component intercepts those states to prevent accidental data leaks:
- When rendered in `DISPLAY_ONLY`, `LABELS_LEFT`, or `STACKED_LARGE_VAL` modes, the component automatically suppresses the raw Pega clipboard value.
- It instead renders a static string of `********` to the DOM, ensuring that sensitive data cannot be scraped or viewed by shoulder-surfers during review stages.

### 3. Lightweight & Pruned Boilerplate
- **No Unused Code:** Unlike standard CLI-generated components, this component has been aggressively pruned.
- **Removed Bloat:** It does not contain irrelevant logic for AI text suggestions (`suggestionsHandler`), case status badging, or rich-text formatters, resulting in a leaner bundle size and faster load times.

### 4. Seamless Pega Integration
- **State Binding:** Uses the standard `getPConnect().getStateProps()` to read values and `getPConnect().getActionsApi().updateFieldValue()` to securely dispatch user input back to the server.

## 🛠️ Development & Testing
- **Storybook:** Fully configured and grouped under `Fields/Password Input Enhanced`. The Storybook environment safely mocks `window.PCore` to prevent crashes outside of the Pega runtime.
- **Unit Testing:** Comprehensive Jest/React Testing Library coverage (`demo.test.tsx`) that asserts the correct rendering of the password field, placeholder strings, and mocked states.

## Installation
If you are developing this locally, ensure you have run `npm install` and your environment has the global `pega-cosmos-react-work.d.ts` declaration file to prevent missing module type errors.

