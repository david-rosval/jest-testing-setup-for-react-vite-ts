# Jest setup for React TypeScript Vite project

This guide follows the tutorial from [Jest setup for React TypeScript Vite project - 2025 | Concise Developer]([https://](https://youtu.be/jlZBrcnoP9g?si=IMIDxLUFIVgvZEY3))

## Initialize a new React project

```bash
npm create-vite@latest my-app 
```

## Install testing dev dependencies

```bash
npm i -D jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom ts-node
```

## Add configuration files

### /test/jest.config.js

This file will import the jest-dom library, which provides custom matchers for asserting on DOM nodes.

```typescript
import '@testing-library/jest-dom';
```

### /test/mocks/fileMock.js

This file is used to mock static assets like images, fonts, etc. in Jest tests.

```javascript
module.exports = {
  __esModule: true,
  default: 'test-file-stub',
};
```

### jest.config.ts

This file is the main configuration file for Jest. It specifies the test environment, module file extensions, and other settings. 

```typescript
import type { Config } from 'jest'

const config: Config = {
  rootDir: './',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/mocks/fileMock.js"
  },
}

export default config
```

Here is a breakdown of the configuration:

- **rootDir**: The root directory for Jest to look for tests and modules.
- **testEnvironment**: The environment in which the tests will run. In this case, it's set to 'jsdom' for testing React components.
- **setupfilesafterenv**: An array of file paths to run after the test framework is set up. In this case, it includes the jest.setup.ts file which imports the jest-dom library.
- **transform**: A mapping of file extensions to transformers. In this case, it uses ts-jest to transform TypeScript files.
- **moduleNameMapper**: A mapping of module names to mock files. In this case, it maps static asset file extensions to the fileMock.js file which mocks them.

## Add extra compiler options to tsconfig.json file

This options are needed to make the bundler work with Jest and TypeScript.

```json
{
  ...
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.AsyncIterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["@testing-library/jest-dom"]
  },
  ...
}
```

Here is a breakdown of the options:
- **target**: The target ECMAScript version. In this case, it's set to ES2020.
- **useDefineForClassFields**: This option is set to true to use the new class fields syntax.
- **lib**: An array of library files to include in the compilation. In this case, it includes ES2020, DOM, and DOM.AsyncIterable.
- **module**: The module system to use. In this case, it's set to ESNext.
- **skipLibCheck**: This option is set to true to skip type checking of declaration files.
- **esModuleInterop**: This option is set to true to enable emit interoperability between CommonJS and ES Modules.
- **moduleResolution**: This option is set to "bundler" to use the bundler module resolution strategy.
- **allowImportingTsExtensions**: This option is set to true to allow importing TypeScript files with .ts extensions.
- **resolveJsonModule**: This option is set to true to allow importing JSON files as modules.
- **isolatedModules**: This option is set to true to ensure that each file can be transpiled independently.
- **noEmit**: This option is set to true to prevent emitting output files.
- **jsx**: The JSX code generation mode. In this case, it's set to "react-jsx" for React 17+.
- **types**: An array of type declaration files to include in the compilation. In this case, it includes the @testing-library/jest-dom library for custom matchers.

## Add the test folder to the include array in the tsconfig.app.json file

This is needed to validate the types when writing tests.

```json
{
  ...
  "include": ["src","test"]
}
```

The include array specifies the files and directories to include in the compilation. In this case, it includes the src directory and the test directory for Jest tests.

## Add the test script to package.json
This script will run the Jest tests.

```json
{
  ...
  "scripts": {
    ...
    "test": "jest"
  },
  ...
}
```

## Run the tests

```bash
npm test
```
This command will run the Jest tests in the project. You should see output indicating the number of tests passed and failed.

