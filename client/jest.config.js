module.exports = {
  testEnvironment: "jsdom",
  //   transform: {
  //     "^.+\\.(js|jsx)$": "esbuild-jest",
  //   },
  transformIgnorePatterns: ["/node_modules/(?!swiper)"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/cssMock.js",
  },
};
