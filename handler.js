
const serverless = require("serverless-http");
const app = require("./app"); // Import the Express app

module.exports.handler = serverless(app); // ✅ Ensure this is correctly exported
