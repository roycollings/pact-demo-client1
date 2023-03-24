require("dotenv").config();

const { Pact } = require("@pact-foundation/pact");
const { version: consumerVersion } = require("../../package.json");

// The class / package in our app that sends requests to the provider.
const fetchUtilities = require("../app/fetchUtilities");

// Our interaction definitions.
const getItems = require("./interactions/getItems");

const {
    PACT_BROKER_TOKEN,
    PACT_BROKER,
    PACT_CONSUMER_NAME,
    PACT_PROVIDER_NAME
} = process.env;

const pactFolder = `${__dirname}/pactfiles`;

// Create provider mock on localhost:8081.
const provider = new Pact({
    dir: pactFolder,
    consumer: PACT_CONSUMER_NAME,
    provider: PACT_PROVIDER_NAME,
    log: `${__dirname}/test_log.txt`
});

const opts = {
    pactFilesOrDirs: [pactFolder],
    pactBroker: PACT_BROKER,
    pactBrokerToken: PACT_BROKER_TOKEN,
    consumerVersion,
    publishVerificationResult: true
};

describe("Items", () => {
    let mockProviderUrl;

    beforeAll(async () => {
        // Start the Pact mock-provider
        const { port } = await provider.setup();
        mockProviderUrl = `http://localhost:${port}`;
    });

    beforeEach(
        async () =>
            // Clear out previous interactions.
            await provider.removeInteractions()
    );

    afterEach(
        async () =>
            // Pact checks that the request matched the interaction definition.
            await provider.verify()
    );

    afterAll(async () => {
        // Writes the pactfile.
        await provider.finalize();

        // TODO: Publisher is no longer used like this (use cli instead)
        // const publisher = new Publisher(opts);
        // await publisher.publishPacts();
    });

    // Test each endpoint our consumer app uses.
    test("/items", async () => {
        // Add our expected interaction (Pact expects all interactions to be tested)
        provider.addInteraction(getItems);

        // Run the relevant consumer app 'fetch' function.
        await fetchUtilities(mockProviderUrl).getItems(1);

        // No need to 'assert' anything - the pact mock will fail if the above test fails.
    });
});