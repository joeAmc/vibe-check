module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/cssMock.js",
  },
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!swiper|ssr-window|dom7).*/"],
};
