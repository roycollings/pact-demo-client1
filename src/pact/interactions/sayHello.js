const { Matchers } = require("@pact-foundation/pact");

module.exports = {
    state: "Saying hello",
    uponReceiving: "a request to say hello",
    withRequest: {
        method: "GET",
        path: "/"
    },
    willRespondWith: {
        status: 200,
        body: {
            "message": Matchers.string("hello")
        }
    }
};