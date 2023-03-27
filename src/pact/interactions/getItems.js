const { Matchers } = require("@pact-foundation/pact");
const { regex, url } = require("@pact-foundation/pact/src/v3/matchers");
const { term } = Matchers;

module.exports = {
    state: "Getting an item",
    uponReceiving: "a request for an item",
    withRequest: {
        method: "GET",
        path: term({ generate: "/items/1", matcher: "/items/[0-9]" })
    },

    willRespondWith: {
        status: 200,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
            "item_id": Matchers.integer(1)
        }
    }
};