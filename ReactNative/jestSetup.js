import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

module.exports = {
    // Load setup-tests.js before test execution
    setupFilesAfterEnv: '<rootDir>setup-tests.js',
    testURL: 'http://localhost/'
  };