# Cypress POM Project with Cucumber, Allure Reports and JavaScript
📋 Project Overview

This project is a test automation suite built with **Cypress**, **Cucumber**, and **JavaScript**, following the **Page Object Model (POM)** architecture for better code organization and maintenance.  
The project targets the BlankFactor website: [BlankFactor](https://blankfactor.com)

## 📋 Why Use These Technologies?

### **Cypress**
* Fast, reliable, and easy to set up.
* Provides real-time reloading and interactive debugging.
* Rich set of built-in commands for browser automation.

### **Cucumber (Gherkin)**
* Enables Behavior-Driven Development (BDD) with human-readable test scenarios.
* Facilitates collaboration between technical and non-technical team members.

### **JavaScript**
* Widely used language with a vast ecosystem.
* Easily integrates with frontend technologies.

### **Page Object Model (POM)**
* Encourages code reusability and maintainability.
* Separates test logic from UI interactions, reducing duplication.

## 🚀 Project Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/FECORREA91/blankfactorCyTest.git
   cd blankfactorCyTest

2. **Install Dependencies:**

   ```bash
   npm install
   ```


## 🏗️ Project Structure

```
📂 cypress-project
├── 📁 cypress
│   ├── 📁 e2e
│   │   └── 📁 features
│   │       ├── automation_blankfactor.feature
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

## 🧪 Run the Tests

1. **Open Cypress Test Runner (Interactive):**


# Interactive mode (Cypress UI)
```
npm run test:open
```
# Headless mode (Allure reports enabled)
```
npm run test
```

# CI mode (Chrome headless)
```
npm run test:ci
```

2. **Run All Tests (Headless):**

   ```bash
   npx cypress run
   ```

## 📊 Generate Allure Report

1. **Generate the report from results:**

   ```bash
   npx allure generate allure-results --clean -o allure-report
   ```

   # Generate and view Allure report
npm run report

# Serve temporary report (http://localhost:8080)
npm run report:serve

# Full clean execution (CI/CD ready)
npm run full-test

2. **Open the report in browser:**

   ```bash
   npx allure open allure-report
   ```

## 🔧 Additional Tools and Plugins

* **@badeball/cypress-cucumber-preprocessor** – to support Gherkin syntax.
* **@shelex/cypress-allure-plugin** – to generate Allure reports.
* **cypress-esbuild-preprocessor** – for fast bundling of tests.
* **cypress-xpath** – to support XPath selectors.

## 📚 Resources

* [Cypress Documentation](https://docs.cypress.io/)
* [Cucumber Gherkin Reference](https://cucumber.io/docs/gherkin/)
* [Allure Report Documentation](https://docs.qameta.io/allure/)
* [BlankFactor Website](https://blankfactor.com)

## 🤝 Contributing

Feel free to contribute to this project by submitting pull requests or opening issues.


