module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};
