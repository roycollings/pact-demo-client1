require('isomorphic-fetch');
const path = require("path");

module.exports = (apiUrl) => ({
    getItems: async (itemNumber) => fetch(path.join(apiUrl, "items", itemNumber.toString())),
    sayHello: async () => fetch(apiUrl)
});