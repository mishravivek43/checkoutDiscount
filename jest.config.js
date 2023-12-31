module.exports = {
  // roots: ["./src"],
  // testMatch: [
  //   "**/__tests__/**/*.+(ts|tsx|js)",
  //   "**/?(*.)+(spec|test).+(ts|tsx|js)",
  // ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  preset: "ts-jest",
  testEnvironment: "node",
};
