# Coding Assignment

## Description

This project is a React application that utilizes Zustand for state management and React Query for data fetching. It includes components for displaying user information and supports filtering and sorting functionalities.

### Reasons for Technology Choices

- **Vite**: Chosen for its fast hot module replacement (HMR), significantly improving the development experience by enabling instant feedback on code changes.
- **Vitest**: Selected for testing because it offers a Jest-like experience with Vite's native ES modules support, making it faster and more efficient for modern JavaScript projects.
- **Playwright**: Used for end-to-end testing to ensure that the application behaves as expected in real-world scenarios across different browsers. It provides reliable automation and supports advanced testing needs.
- **Zustand**: A minimalistic state management solution that simplifies state logic in React applications. It's chosen for its simplicity, ease of use, and performance benefits.
- **@tanstack/react-query**: Utilized for fetching, caching, and updating data in React applications. It simplifies data fetching and state management with efficient caching and background updates, improving user experience and application performance.

## Installation

To install the project dependencies, run:

```
pnpm install
pnpm dev
pnpm test
```

## Configuration

- **Vitest Configuration**: The testing configuration is defined in `vitest.config.ts` which sets up the environment and global settings for tests.
- **Playwright Configuration**: The end-to-end testing configuration is in `playwright.config.ts`, specifying test directories, parallel execution, and browser settings.

## Code Quality

- **ESLint**: The project uses ESLint for linting, with configurations specified in `eslint.config.js`. It helps maintain code quality and consistency across the project.

## Mock Data

Mock data for users is available in `src/mockData/users.ts` for testing purposes. This allows for the simulation of real data fetching scenarios during development and testing.
