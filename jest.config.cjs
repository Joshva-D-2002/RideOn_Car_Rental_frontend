module.exports = {
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        '^.+\\.css$': 'jest-transform-css',

    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.setup.ts'],
};
