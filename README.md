# Cypress POM Project with Cucumber, Allure Reports and JavaScript

## 📋 Project Overview

This project is a test automation suite built with **Cypress**, **Cucumber**, and **JavaScript**, following the **Page Object Model (POM)** architecture for better code organization and maintainability.  
The tests are implemented for the BlankFactor website: [blankfactor.com](https://blankfactor.com)

---

## 💡 Why These Technologies?

### ✅ Cypress
- Fast, reliable, and easy to set up.
- Real-time reloading and interactive debugging.
- Rich set of built-in commands for browser automation.

### ✅ Cucumber (Gherkin)
- Enables Behavior-Driven Development (BDD) with human-readable scenarios.
- Promotes collaboration between technical and non-technical stakeholders.

### ✅ JavaScript
- Popular language with a broad community and extensive libraries.
- Easily integrates with frontend technologies.

### ✅ Page Object Model (POM)
- Encourages reusability and cleaner test code.
- Separates UI element interactions from test logic.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/FECORREA91/blankfactorCyTest.git
cd blankfactorCyTest
```
2. Install Dependencies
```
npm install
```
🏗️ Project Structure

```
📂 blankfactorCyTest
├── 📁 cypress
│   ├── 📁 e2e
│   │   └── 📁 features
│   │       └── automation_blankfactor.feature
│   ├── 📁 support
│   │   ├── 📁 pageObjects
│   │   │   ├── HomePage.js
│   │   │   ├── IndustriesPage.js
│   │   │   └── RetirementPage.js
│   │   └── 📁 step_definitions
│   │       └── automationSteps.js
├── 📁 allure-results
├── 📁 allure-report
├── cypress.config.js
├── .gitignore
└── package.json
```

## ⚙️ Continuous Integration – GitHub Actions

This project uses **GitHub Actions** to automate the test pipeline on each `push` or `pull request` to the `main` and `develop` branches.

### 🧪 What Happens in the Workflow?

- Installs project dependencies using `npm ci`.
- Verifies Cypress installation.
- Runs Cypress tests in **headless Chrome** mode.
- Generates **Allure reports** after test execution.
- Stores screenshots and video recordings in the defined folders.
- Executes even if the test step fails (for complete reporting).

### 🗂️ Workflow File Location:
```
.github/workflows/cypress-tests.yml
```
🧪 Running Tests
1. Interactive Mode (UI)
```
npm run test:open
```
2. Headless Mode with Allure Reports
```
npm run test
```
3. CI Mode (Chrome Headless)
```
npm run test:ci
```
4. Basic Cypress Headless Run
```
npx cypress run
```
📊 Allure Report Generation
1. Generate Allure Report
```
npx allure generate allure-results --clean -o allure-report
```
2. Launch Report in Browser
```
npx allure open allure-report
```
3. Predefined Commands
```
npm run report – Generate and view report

npm run report:serve – Serve temporary report at http://localhost:8080

npm run full-test – Clean test execution + report (CI/CD ready)
```
🔌 Tools & Plugins
@badeball/cypress-cucumber-preprocessor – Gherkin support

@shelex/cypress-allure-plugin – Allure integration

cypress-esbuild-preprocessor – Faster bundling

cypress-xpath – XPath selector support

## 📚 Resources

- [📘 Cypress Documentation](https://docs.cypress.io/app/get-started/why-cypress)
- [🍀 Cucumber Reference](https://cucumber.io/docs/cucumber/api/)
- [📊 Allure Report Guide](https://allurereport.org/docs/)
- [🌐 BlankFactor Website](https://blankfactor.com/)

🤝 Contributing
Feel free to fork the repo, submit pull requests, or open issues to collaborate on this project
