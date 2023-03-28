require("dotenv").config();

const { Pact } = require("@pact-foundation/pact");
const { version: consumerVersion, name: consumerName } = require("../../package.json");

// The class / package in our app that sends requests to the provider.
const fetchUtilities = require("../app/fetchUtilities");

// Our interaction definitions.
const getItems = require("./interactions/getItems");

const pactFolder = `${__dirname}/pactfiles`;

// Create provider mock on localhost:8081.
const provider = new Pact({
    dir: pactFolder,
    consumer: consumerName,
    provider: "pact-demo-api1",
    log: `${__dirname}/test_log.txt`
});

describe("Get an item", () => {
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
        provider.addInteraction(getItems);

        // Run the relevant consumer app 'fetch' function.
        await fetchUtilities(mockProviderUrl).getItems(1);

        // No need to 'assert' anything - the pact mock will fail if the above test fails.
    });
});