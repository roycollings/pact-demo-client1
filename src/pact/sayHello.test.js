require("dotenv").config();

const { Pact } = require("@pact-foundation/pact");
const { name: consumerName } = require("../../package.json");

// The class / package in our app that handles interactions with the provider.
const fetchUtilities = require("../app/fetchUtilities");

// Our interaction definitions.
const sayHello = require("./interactions/sayHello");

const pactFolder = `${__dirname}/pactfiles`;

// Create provider mock on localhost:8081.
const provider = new Pact({
    dir: pactFolder,
    consumer: consumerName,
    log: `${__dirname}/test_log.txt`,

    // This name must match the name the provider uses for PactFlow.
    provider: "pact-demo-api1",
});

describe("Root url", () => {
    let mockProviderUrl;

    beforeAll(async () => {
        // Start the Pact mock-provider
        const { port } = await provider.setup();
        mockProviderUrl = `http://localhost:${port}`;
    });

    afterEach(
        async () =>
            // Pact checks that the request matched the interaction definition.
            await provider.verify()
    );

    afterAll(async () => {
        // Writes the pactfile.
        await provider.finalize();
    });

    // Test each endpoint our consumer app uses.
    test("/", async () => {
        // Add our expected interaction (Pact expects all interactions to be tested)
        provider.addInteraction(sayHello);

        // Run the relevant consumer app 'fetch' function.
        await fetchUtilities(mockProviderUrl).sayHello();

        // No need to 'assert' anything - the pact mock will fail if the above test fails.
    });
})