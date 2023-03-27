const { Matchers } = require("@pact-foundation/pact");
const { like } = Matchers

module.exports = {
    state: "Saying hello",
    uponReceiving: "a request to say hello",
    withRequest: {
        method: "GET",
        path: "/"
    },

    willRespondWith: {
        status: 200,
        body: like({
            "message": "hello"
        })
    }
};