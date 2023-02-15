export default {
  displayName: {
    name: 'api',
    color: 'magentaBright',
  },
  moduleFileExtension: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "@swc/jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    '@fc/micro\\-videos/(.*)$': '<rootDir>/../../../node_modules/@fc/micro-videos/dist/$1'
  }
};
