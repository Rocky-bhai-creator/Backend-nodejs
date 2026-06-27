const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

const accountsid = process.env.TWILIO_ACCOUNT_SID;
const authtoken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountsid, authtoken);

const SERVICE_SID = process.env.TWILIO_CONVERSATION_SERVICE_SID;

module.exports = { client, SERVICE_SID };