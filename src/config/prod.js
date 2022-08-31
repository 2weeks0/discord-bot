const CLIENT_ID = process.env.CLIENT_ID;
const SERVER_ID = process.env.SERVER_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;
const MONGO_URL = process.env.MONGO_URL;
const CHANNEL_TYPES = {};
CHANNEL_TYPES[process.env.CH_ID_BLOG] = "Blog";
CHANNEL_TYPES[process.env.CH_ID_ALGO] = "Algorithm";

export default { CLIENT_ID, SERVER_ID, BOT_TOKEN, MONGO_URL, CHANNEL_TYPES };
