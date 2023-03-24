const package = require("./package.json");

module.exports = {
    verbose: false,

    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
    coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
    modulePathIgnorePatterns: ["dist"],

    displayName: package.name
};