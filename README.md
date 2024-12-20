
# TDD String Calculator

a simple implementation of the String Calculator demonstrating Test-Driven Development (TDD)


## Prerequisites

 - [Node.js](https://nodejs.org/en/download/package-manager)
 - [npm](https://www.npmjs.com/)
 


## Installation

to clone the repository and install depedencies, run the following commands

```bash
  git clone https://github.com/pavan-kaushal/tdd-calculator.git
  cd tdd-calculator
  npm install
```
    
## Directory Structure

``` bash
/tdd-calculator
│
├── src
│   └── calculator.ts
│   ├── utils
│       └── helpers.ts
│
├── tests
│   └── add-function.test.ts
│
├── jest.config.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### Project Files
```src/calculator.ts``` The core logic of the project resides here. This file contains the implementation of various mathematical operations or any other functionality you aim to provide in the calculator module.

```tests/add-function.test.ts``` Houses the suite that contains unit tests for the add method implemented in the calculator class. All tests are written using [Jest](https://jestjs.io/).

### Configuration Files
```jest.config.ts``` The configuration file for Jest, the testing framework. It defines the settings and customizations for running tests in the project, such as test environment, file patterns, and module mappings.

```tsconfig.json``` The TypeScript configuration file. It specifies the compiler options, paths, and rules for transpiling TypeScript code into JavaScript.

### Dependency Management
```package.json``` This file manages the project's dependencies, scripts, metadata, and configurations for Node.js and npm. It’s the central hub for defining and running the project.

```package-lock.json``` Automatically generated by npm to lock the exact versions of dependencies. This ensures consistent installations across different environments.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
