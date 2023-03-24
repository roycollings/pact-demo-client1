const package = require("./package.json");

module.exports = {
    verbose: true,

    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
    coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
    modulePathIgnorePatterns: ["dist"],

    name: package.name,
    displayName: package.name
};