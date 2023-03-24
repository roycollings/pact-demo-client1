const { Matchers } = require("@pact-foundation/pact");

module.exports = {
    state: "Getting an item",
    uponReceiving: "a request for an item",
    withRequest: {
        method: "GET",
        path: "/items/1"
    },

    willRespondWith: {
        status: 200,
        body: {
            "item_id": Matchers.integer
        }
    }
};