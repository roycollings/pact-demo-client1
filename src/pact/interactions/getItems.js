const { Matchers } = require("@pact-foundation/pact");
const { regex, url } = require("@pact-foundation/pact/src/v3/matchers");
const { term, like } = Matchers;

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
            "item_id": Matchers.integer()
        }
    }
};