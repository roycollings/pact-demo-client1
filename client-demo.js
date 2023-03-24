require("dotenv").config();

const fetchUtilities = require("./src/app/fetchUtilities");
const { getItems, sayHello } = fetchUtilities("http://127.0.0.1:8000/");

(async () => {
    const getItemsResponse = await getItems(1);

    console.log("getItems:", {
        status: getItemsResponse.status,
        body: await getItemsResponse.json()
    });

    const sayHelloResponse = await sayHello();

    console.log("sayHello:", {
        status: sayHelloResponse.status,
        body: await sayHelloResponse.json()
    });
})();